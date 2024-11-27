import { Sequelize } from 'sequelize-typescript';
import { RideSequelizeRepository } from '../ride.repository';
import { RideModel } from '../../model/ride.model';
import { DriverModel } from '../../../../../driver/db/sequelize/model/driver.model';
import { CustomerModel } from '../../../../../customer/db/sequelize/model/customer.model';
import { Ride } from '../../../../../../domain/ride/entity/ride.entity';
import { NotFoundError } from '../../../../../../@shared/domain/errors/not-found.error';

describe('RideSequelizeRepository Integration Tests', () => {
  let repository: RideSequelizeRepository;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [RideModel, DriverModel, CustomerModel],
      logging: false,
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    repository = new RideSequelizeRepository(RideModel);
  });

  test('should inserts a new entity', async () => {
    const created_at = new Date();
    let ride = Ride.create({
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
      created_at,
    });
    await repository.create(ride);
    let entity = await repository.find(ride.ride_id.id);
    expect(entity.toJSON()).toStrictEqual(ride.toJSON());
  });
  test('should finds a entity by id', async () => {
    let entityFound = await repository.find('');
    expect(entityFound).toBeNull();

    const created_at = new Date();
    let entity = Ride.create({
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
      created_at,
    });
    await repository.create(entity);
    entityFound = await repository.find(entity.ride_id.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  test('should return all rides', async () => {
    const created_at = new Date();
    let entity = Ride.create({
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
      created_at,
    });
    await repository.create(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  test('should throw error on update when a entity not found', async () => {
    let entity = Ride.create({
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
    });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.ride_id, Ride)
    );
  });

  test('should throw error on delete when a entity not found', async () => {
    const rideId = '';
    await expect(repository.delete(rideId)).rejects.toThrow(
      new NotFoundError(rideId, Ride)
    );
  });

  test('should delete an entity', async () => {
    let entity = Ride.create({
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
    });
    await repository.create(entity);

    await repository.delete(entity.ride_id.id);
    await expect(repository.find(entity.ride_id.id)).resolves.toBeNull();
  });

  test('should find rides by customer_id and optionally by driver_id', async () => {
    const created_at = new Date();
    const customer = await CustomerModel.create({
      customer_id: 'customer_1',
      created_at,
    });

    const driver1 = await DriverModel.create({
      driver_id: 'driver_1',
      name: 'Homer Simpson',
      description: 'Driver 1 Description',
      vehicle: 'Vehicle 1',
      comment: 'Comment 1',
      rating: 5,
      minimumKm: 10,
    });

    const driver2 = await DriverModel.create({
      driver_id: 'driver_2',
      name: 'Marge Simpson',
      description: 'Driver 2 Description',
      vehicle: 'Vehicle 2',
      comment: 'Comment 2',
      rating: 4,
      minimumKm: 20,
    });

    const ride1 = Ride.create({
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
      customer_id: customer.customer_id,
      driver_id: driver1.driver_id,
    });
    await repository.create(ride1);

    const ride2 = Ride.create({
      origin: 'Rua Fictícia',
      destination: 'Avenida Exemplo',
      duration: '15 minutos',
      distance: 20,
      value: 200,
      customer_id: customer.customer_id,
      driver_id: driver2.driver_id,
    });
    await repository.create(ride2);

    const ridesByCustomer = await repository.findByCustomerAndDriver(
      customer.customer_id
    );

    console.log(ridesByCustomer);

    expect(ridesByCustomer).toHaveLength(2);

    const ridesByDriver = await repository.findByCustomerAndDriver(
      customer.customer_id,
      driver1.driver_id
    );

    expect(ridesByDriver).toHaveLength(1);
  });
});

import { Sequelize } from 'sequelize-typescript';
import { Driver } from '../../../../../../domain/driver/entity/driver.entity';
import { NotFoundError } from '../../../../../../@shared/domain/errors/not-found.error';
import { DriverSequelizeRepository } from '../driver.repository';
import { DriverModel } from '../../model/driver.model';
import { RideModel } from '../../../../../ride/db/sequelize/model/ride.model';
import { CustomerModel } from '../../../../../customer/db/sequelize/model/customer.model';

describe('DriverSequelizeRepository Integration Tests', () => {
  let repository: DriverSequelizeRepository;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [DriverModel, RideModel, CustomerModel],
      logging: false,
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    repository = new DriverSequelizeRepository(DriverModel);
  });

  test('should inserts a new entity', async () => {
    let driver = Driver.create({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
    await repository.create(driver);
    let entity = await repository.find(driver.driver_id);
    expect(entity.toJSON()).toStrictEqual(driver.toJSON());
  });
  test('should finds a entity by id', async () => {
    let entityFound = await repository.find('');
    expect(entityFound).toBeNull();

    let entity = Driver.create({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
    await repository.create(entity);
    entityFound = await repository.find(entity.driver_id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  test('should return all drivers', async () => {
    let entity = Driver.create({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
    await repository.create(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  test('should throw error on update when a entity not found', async () => {
    let entity = Driver.create({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.driver_id, Driver)
    );
  });

  test('should update a entity', async () => {
    let entity = Driver.create({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
    await repository.create(entity);

    entity.changeName('Bart Simpson');
    await repository.update(entity);

    const entityFound = await repository.find(entity.driver_id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  test('should throw error on delete when a entity not found', async () => {
    const driverId = '';
    await expect(repository.delete(driverId)).rejects.toThrow(
      new NotFoundError(driverId, Driver)
    );
  });

  test('should delete an entity', async () => {
    let entity = Driver.create({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
    await repository.create(entity);

    await repository.delete(entity.driver_id);
    await expect(repository.find(entity.driver_id)).resolves.toBeNull();
  });
});

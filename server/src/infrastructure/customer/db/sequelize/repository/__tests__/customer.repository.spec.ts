import { Sequelize } from 'sequelize-typescript';
import { CustomerSequelizeRepository } from '../customer.repository';
import { CustomerModel } from '../../model/customer.model';
import { Customer } from '../../../../../../domain/customer/entity/customer.entity';
import { NotFoundError } from '../../../../../../@shared/domain/errors/not-found.error';
import { RideModel } from '../../../../../ride/db/sequelize/model/ride.model';
import { DriverModel } from '../../../../../driver/db/sequelize/model/driver.model';

describe('CustomerSequelizeRepository Integration Tests', () => {
  let repository: CustomerSequelizeRepository;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [CustomerModel, RideModel, DriverModel],
      logging: false,
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    repository = new CustomerSequelizeRepository(CustomerModel);
  });

  test('should inserts a new entity', async () => {
    let customer = Customer.create({
      customer_id: '01',
    });
    const save = await repository.create(customer);
    let entity = await repository.find(customer.customer_id);
    expect(entity.toJSON()).toStrictEqual(customer.toJSON());
  });
  test('should finds a entity by id', async () => {
    let entityFound = await repository.find('');
    expect(entityFound).toBeNull();

    let entity = Customer.create({
      customer_id: '02',
    });
    await repository.create(entity);
    entityFound = await repository.find(entity.customer_id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  test('should return all customers', async () => {
    let entity = Customer.create({
      customer_id: '03',
    });
    await repository.create(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  test('should throw error on update when a entity not found', async () => {
    let entity = Customer.create({
      customer_id: '03',
    });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.customer_id, Customer)
    );
  });

  test('should update a entity', async () => {
    let entity = Customer.create({
      customer_id: '03',
    });
    await repository.create(entity);

    await repository.update(entity);

    const entityFound = await repository.find(entity.customer_id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  test('should throw error on delete when a entity not found', async () => {
    const customerId = '';
    await expect(repository.delete(customerId)).rejects.toThrow(
      new NotFoundError(customerId, Customer)
    );
  });

  test('should delete an entity', async () => {
    let entity = Customer.create({
      customer_id: '03',
    });
    await repository.create(entity);

    await repository.delete(entity.customer_id);
    await expect(repository.find(entity.customer_id)).resolves.toBeNull();
  });
});

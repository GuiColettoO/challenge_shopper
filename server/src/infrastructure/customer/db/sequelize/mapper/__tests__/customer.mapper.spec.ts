import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../model/customer.model';
import { CustomerModelMapper } from '../customer.mapper';
import { Customer } from '../../../../../../domain/customer/entity/customer.entity';
import { RideModel } from '../../../../../ride/db/sequelize/model/ride.model';
import { DriverModel } from '../../../../../driver/db/sequelize/model/driver.model';

describe('CustomerModel Integration Tests', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [CustomerModel, RideModel, DriverModel],
      logging: false,
    });

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should convert a Customer model to a Customer entity', () => {
    const created_at = new Date();

    const model = CustomerModel.build({
      customer_id: '01',
      created_at,
    });

    const aggregate = CustomerModelMapper.toEntity(model);
    expect(aggregate.toJSON()).toStrictEqual(
      CustomerModelMapper.toEntity(model).toJSON()
    );
  });

  test('should convert a Customer entity to a Customer model', () => {
    const aggregate = Customer.create({
      customer_id: '01',
    });

    const model = CustomerModelMapper.toModel(aggregate);
    expect(model.toJSON()).toStrictEqual(
      CustomerModelMapper.toModel(aggregate).toJSON()
    );
  });
});

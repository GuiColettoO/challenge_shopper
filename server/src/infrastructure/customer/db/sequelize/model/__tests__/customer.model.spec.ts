import { DataType, Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../customer.model';
import { DriverModel } from '../../../../../driver/db/sequelize/model/driver.model';
import { RideModel } from '../../../../../ride/db/sequelize/model/ride.model';

describe('CustomerModel', () => {
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

  test('mapping props', () => {
    const attributesMap = CustomerModel.getAttributes();
    const attributes = Object.keys(CustomerModel.getAttributes());

    expect(attributes).toStrictEqual(['customer_id', 'created_at']);

    const customerIdAttr = attributesMap.customer_id;
    expect(customerIdAttr).toMatchObject({
      field: 'customer_id',
      fieldName: 'customer_id',
      primaryKey: true,
      type: DataType.STRING(),
    });
  });

  test('create', async () => {
    const created_at = new Date();
    const arrange = {
      customer_id: '01',
      created_at,
    };

    const customer = await CustomerModel.create(arrange);

    expect(customer.toJSON()).toStrictEqual(arrange);
  });
});

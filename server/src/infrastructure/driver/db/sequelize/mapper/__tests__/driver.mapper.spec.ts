import { Sequelize } from 'sequelize-typescript';
import { DriverModel } from '../../model/driver.model';
import { DriverModelMapper } from '../driver.mapper';
import { Driver } from '../../../../../../domain/driver/entity/driver.entity';
import { CustomerModel } from '../../../../../customer/db/sequelize/model/customer.model';
import { RideModel } from '../../../../../ride/db/sequelize/model/ride.model';

describe('DriverModel Integration Tests', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [DriverModel, CustomerModel, RideModel],
      logging: false,
    });

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should convert a Driver model to a Driver entity', () => {
    const model = DriverModel.build({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });

    const aggregate = DriverModelMapper.toEntity(model);
    expect(aggregate.toJSON()).toStrictEqual(
      DriverModelMapper.toEntity(model).toJSON()
    );
  });

  test('should convert a Driver entity to a Driver model', () => {
    const aggregate = Driver.create({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });

    const model = DriverModelMapper.toModel(aggregate);
    expect(model.toJSON()).toStrictEqual(
      DriverModelMapper.toModel(aggregate).toJSON()
    );
  });
});

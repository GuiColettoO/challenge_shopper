import { Sequelize } from 'sequelize-typescript';
import { Ride } from '../../../../../../domain/ride/entity/ride.entity';
import { CustomerModel } from '../../../../../customer/db/sequelize/model/customer.model';
import { Uuid } from '../../../../../../@shared/domain/value-objects/uuid/uuid.vo';
import { RideModel } from '../../../../../ride/db/sequelize/model/ride.model';
import { DriverModel } from '../../../../../driver/db/sequelize/model/driver.model';
import { RideModelMapper } from '../ride.mapper';

describe('RideModel Integration Tests', () => {
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

  test('should convert a Ride model to a Ride entity', () => {
    const created_at = new Date();
    const model = RideModel.build({
      ride_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
      created_at,
    });

    const aggregate = RideModelMapper.toEntity(model);
    expect(aggregate.toJSON()).toStrictEqual(
      RideModelMapper.toEntity(model).toJSON()
    );
  });

  test('should convert a Ride entity to a Ride model', () => {
    const aggregate = Ride.create({
      ride_id: new Uuid(),
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
    });

    const model = RideModelMapper.toModel(aggregate);
    expect(model.toJSON()).toStrictEqual(
      RideModelMapper.toModel(aggregate).toJSON()
    );
  });
});

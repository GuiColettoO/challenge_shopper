import { DataType, Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../../../customer/db/sequelize/model/customer.model';
import { DriverModel } from '../../../../../driver/db/sequelize/model/driver.model';
import { RideModel } from '../ride.model';
import { Uuid } from '../../../../../../@shared/domain/value-objects/uuid/uuid.vo';

describe('RideModel', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [RideModel, DriverModel, CustomerModel],
      logging: false,
    });

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('mapping props', () => {
    const attributesMap = RideModel.getAttributes();
    const attributes = Object.keys(RideModel.getAttributes());

    expect(attributes).toStrictEqual([
      'ride_id',
      'origin',
      'destination',
      'duration',
      'distance',
      'value',
      'created_at',
      'customer_id',
      'driver_id',
    ]);

    const rideIdAttr = attributesMap.ride_id;
    expect(rideIdAttr).toMatchObject({
      field: 'ride_id',
      fieldName: 'ride_id',
      primaryKey: true,
      type: DataType.UUID(),
    });

    const originAttr = attributesMap.origin;
    expect(originAttr).toMatchObject({
      field: 'origin',
      fieldName: 'origin',
      type: DataType.STRING(),
    });

    const destinationAttr = attributesMap.destination;
    expect(destinationAttr).toMatchObject({
      field: 'destination',
      fieldName: 'destination',
      type: DataType.STRING(),
    });

    const durationAttr = attributesMap.duration;
    expect(durationAttr).toMatchObject({
      field: 'duration',
      fieldName: 'duration',
      type: DataType.STRING(),
    });

    const distanceAttr = attributesMap.distance;
    expect(distanceAttr).toMatchObject({
      field: 'distance',
      fieldName: 'distance',
      type: DataType.NUMBER(),
    });

    const valueAttr = attributesMap.value;
    expect(valueAttr).toMatchObject({
      field: 'value',
      fieldName: 'value',
      type: DataType.NUMBER(),
    });

    const customer_idAttr = attributesMap.customer_id;
    expect(customer_idAttr).toMatchObject({
      field: 'customer_id',
      fieldName: 'customer_id',
      type: DataType.STRING(),
    });

    const driver_idAttr = attributesMap.driver_id;
    expect(driver_idAttr).toMatchObject({
      field: 'driver_id',
      fieldName: 'driver_id',
      type: DataType.STRING(),
    });
  });

  test('create', async () => {
    const created_at = new Date();
    const arrange = {
      ride_id: new Uuid(),
      origin: 'Avenida Paulista',
      destination: 'Rua Costa Aguiar',
      duration: '10 minutos',
      distance: 10,
      value: 100,
      created_at,
    };

    const ride = await RideModel.create(arrange);

    expect(ride.toJSON()).toStrictEqual(arrange);
  });
});

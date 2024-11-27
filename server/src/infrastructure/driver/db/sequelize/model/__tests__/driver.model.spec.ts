import { DataType, Sequelize } from 'sequelize-typescript';
import { DriverModel } from '../driver.model';
import { Association } from 'sequelize';
import { RideModel } from '../../../../../ride/db/sequelize/model/ride.model';
import { CustomerModel } from '../../../../../customer/db/sequelize/model/customer.model';

describe('DriverModel', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [DriverModel, RideModel, CustomerModel],
      logging: false,
    });

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('mapping props', () => {
    const attributesMap = DriverModel.getAttributes();
    const attributes = Object.keys(DriverModel.getAttributes());

    expect(attributes).toStrictEqual([
      'driver_id',
      'name',
      'description',
      'vehicle',
      'comment',
      'rating',
      'minimumKm',
    ]);

    const driverIdAttr = attributesMap.driver_id;
    expect(driverIdAttr).toMatchObject({
      field: 'driver_id',
      fieldName: 'driver_id',
      primaryKey: true,
      type: DataType.STRING(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: 'name',
      fieldName: 'name',
      type: DataType.STRING(),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: 'description',
      fieldName: 'description',
      type: DataType.STRING(),
    });

    const vehicleAttr = attributesMap.vehicle;
    expect(vehicleAttr).toMatchObject({
      field: 'vehicle',
      fieldName: 'vehicle',
      type: DataType.STRING(),
    });

    const commentAttr = attributesMap.comment;
    expect(commentAttr).toMatchObject({
      field: 'comment',
      fieldName: 'comment',
      type: DataType.STRING(),
    });

    const ratingAttr = attributesMap.rating;
    expect(ratingAttr).toMatchObject({
      field: 'rating',
      fieldName: 'rating',
      type: DataType.NUMBER(),
    });

    const minimumKmAttr = attributesMap.minimumKm;
    expect(minimumKmAttr).toMatchObject({
      field: 'minimumKm',
      fieldName: 'minimumKm',
      type: DataType.NUMBER(),
    });
  });

  test('create', async () => {
    const arrange = {
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    };

    const driver = await DriverModel.create(arrange);

    expect(driver.toJSON()).toStrictEqual(arrange);
  });
});

import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
config();
import { DriverSequelizeRepository } from '../../../../infrastructure/driver/db/sequelize/repository/driver.repository';
import { CustomerModel } from '../../../../infrastructure/customer/db/sequelize/model/customer.model';
import { DriverModel } from '../../../../infrastructure/driver/db/sequelize/model/driver.model';
import { GoogleMapsApi } from '../../../../@shared/infrastructure/repository/google-maps-api-repository/google-maps-api.repository';
import { CustomerSequelizeRepository } from '../../../../infrastructure/customer/db/sequelize/repository/customer.repository';
import { CreateEstimateUseCase } from '../../../estimate/use-case/estimate.use-case';
import { CreateDriverUseCase } from '../../../driver/create/create-driver.use-case';
import { RideModel } from '../../../../infrastructure/ride/db/sequelize/model/ride.model';
import { RideSequelizeRepository } from '../../../../infrastructure/ride/db/sequelize/repository/ride.repository';
import { CreateConfirmUseCase } from '../confirm.use-case';

describe('CreateDriverUseCase Integration Tests', () => {
  let createDriveUseCase: CreateDriverUseCase;
  let driveRepository: DriverSequelizeRepository;
  let rideRepository: RideSequelizeRepository;
  let googleMapsApiRepo: GoogleMapsApi;
  let customerRepository: CustomerSequelizeRepository;
  let createEstimateUseCase: CreateEstimateUseCase;
  let createConfirmUseCase: CreateConfirmUseCase;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [CustomerModel, DriverModel, RideModel],
      logging: false,
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });

    googleMapsApiRepo = new GoogleMapsApi(process.env.GOOGLE_MAPS_API_KEY);
    customerRepository = new CustomerSequelizeRepository(CustomerModel);
    driveRepository = new DriverSequelizeRepository(DriverModel);
    rideRepository = new RideSequelizeRepository(RideModel);
    createDriveUseCase = new CreateDriverUseCase(driveRepository);
    createEstimateUseCase = new CreateEstimateUseCase(
      driveRepository,
      customerRepository,
      googleMapsApiRepo
    );
    createConfirmUseCase = new CreateConfirmUseCase(rideRepository);
  });

  test('should create an confirm', async () => {
    const driver1 = await createDriveUseCase.execute({
      driver_id: '1',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });

    const driver2 = await createDriveUseCase.execute({
      driver_id: '2',
      name: 'Carlos Doe',
      description: 'A not good driver',
      vehicle: 'Porsche',
      comment: '5',
      rating: 10,
      minimumKm: 10,
    });

    const estimate = await createEstimateUseCase.execute({
      customer_id: '1',
      origin: 'Avenida Paulista, São Paulo, Brasil',
      destination: 'Rua Celestino Gomes Bueno, São Paulo, Brasil',
    });

    // console.log(estimate);

    expect(estimate).toStrictEqual({
      origin: {
        latitude: estimate.origin.latitude,
        longitude: estimate.origin.longitude,
      },
      destination: {
        latitude: estimate.destination.latitude,
        longitude: estimate.destination.longitude,
      },
      distance: estimate.distance,
      duration: estimate.duration,
      options: estimate.options,
      routeResponse: estimate.routeResponse,
    });

    const confirm = await createConfirmUseCase.execute({
      customer_id: '1',
      origin: 'Avenida Paulista, São Paulo, Brasil',
      destination: 'Rua Celestino Gomes Bueno, São Paulo, Brasil',
      distance: estimate.distance,
      duration: estimate.duration,
      driver: {
        id: 1,
        name: driver1.name,
      },
      value: estimate.options[0].value,
    });

    expect(confirm).toStrictEqual({
      success: true,
    });
  });
});

import { Sequelize } from 'sequelize-typescript';
import { CreateDriverUseCase } from '../create-driver.use-case';
import { DriverSequelizeRepository } from '../../../../infrastructure/driver/db/sequelize/repository/driver.repository';
import { CustomerModel } from '../../../../infrastructure/customer/db/sequelize/model/customer.model';
import { DriverModel } from '../../../../infrastructure/driver/db/sequelize/model/driver.model';
import { RideModel } from '../../../../infrastructure/ride/db/sequelize/model/ride.model';

describe('CreateDriverUseCase Integration Tests', () => {
  let useCase: CreateDriverUseCase;
  let repository: DriverSequelizeRepository;
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

    repository = new DriverSequelizeRepository(DriverModel);
    useCase = new CreateDriverUseCase(repository);
  });

  test('should create a driver', async () => {
    let output = await useCase.execute({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
    let entity = await repository.find(output.driver_id);
    expect(output).toStrictEqual({
      driver_id: entity.driver_id,
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
  });
});

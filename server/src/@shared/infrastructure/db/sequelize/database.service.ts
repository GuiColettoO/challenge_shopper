import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../../infrastructure/customer/db/sequelize/model/customer.model';
import { DriverModel } from '../../../../infrastructure/driver/db/sequelize/model/driver.model';
import { RideModel } from '../../../../infrastructure/ride/db/sequelize/model/ride.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'shopper',
  database: 'shopper',
  logging: false,
  models: [CustomerModel, DriverModel, RideModel],
});

export default sequelize;

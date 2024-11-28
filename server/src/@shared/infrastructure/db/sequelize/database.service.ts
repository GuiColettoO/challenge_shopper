import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../../infrastructure/customer/db/sequelize/model/customer.model';
import { DriverModel } from '../../../../infrastructure/driver/db/sequelize/model/driver.model';
import { RideModel } from '../../../../infrastructure/ride/db/sequelize/model/ride.model';
require('dotenv').config({ override: false });

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'shopper',
  database: process.env.DB_NAME || 'shopper',
  logging: false,
  models: [CustomerModel, DriverModel, RideModel],
});

export default sequelize;

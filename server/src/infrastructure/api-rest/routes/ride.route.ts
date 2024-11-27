import express, { Request, Response } from 'express';
import { CustomerSequelizeRepository } from '../../customer/db/sequelize/repository/customer.repository';
import { CustomerModel } from '../../customer/db/sequelize/model/customer.model';
import { DriverModel } from '../../driver/db/sequelize/model/driver.model';
import { DriverSequelizeRepository } from '../../driver/db/sequelize/repository/driver.repository';
import { RideModel } from '../../ride/db/sequelize/model/ride.model';
import { RideSequelizeRepository } from '../../ride/db/sequelize/repository/ride.repository';
import {
  CreateEstimateUseCase,
  value,
} from '../../../application/estimate/use-case/estimate.use-case';
import { GoogleMapsApi } from '../../../@shared/infrastructure/repository/google-maps-api-repository/google-maps-api.repository';
import { config } from 'dotenv';
import { CreateConfirmUseCase } from '../../../application/confirm/use-case/confirm.use-case';
import { FindRidesByCustomerAndDriverUseCase } from '../../../application/ride/use-case/findByCustomerAndDriver.use-case';
config();

export const rideRouter = express.Router();

const customerRepository = new CustomerSequelizeRepository(CustomerModel);
const googleMapsApiRepository = new GoogleMapsApi(
  process.env.GOOGLE_MAPS_API_KEY
);
const driverRepository = new DriverSequelizeRepository(DriverModel);
const rideRepository = new RideSequelizeRepository(RideModel);
const createEstimateUseCase = new CreateEstimateUseCase(
  driverRepository,
  customerRepository,
  googleMapsApiRepository
);
const createConfirmUseCase = new CreateConfirmUseCase(rideRepository);
const findByCustomerAndDriverUseCase = new FindRidesByCustomerAndDriverUseCase(
  rideRepository
);

rideRouter.post('/estimate', async (req: Request, res: Response) => {
  try {
    const estimateDto = {
      customer_id: req.body.customer_id,
      origin: req.body.origin,
      destination: req.body.destination,
    };

    const estimate = await createEstimateUseCase.execute(estimateDto);

    res.status(200).json({
      message: 'Operação realizada com sucesso',
      response: estimate,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: 'Os dados fornecidos no corpo da requisicao sao inválidos',
      response: {
        error_code: 'INVALID_DATA',
        error_description: err.message,
      },
    });
  }
});

rideRouter.patch(
  '/confirm',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const confirmDto = {
        customer_id: req.body.customer_id,
        origin: req.body.origin,
        destination: req.body.destination,
        distance: req.body.distance,
        duration: req.body.duration,
        driver: {
          id: req.body.driver.id,
          name: req.body.driver.name,
        },
        value: req.body.value,
      };

      const confirm = await createConfirmUseCase.execute(confirmDto);

      res.status(200).json({
        message: 'Operação realizada com sucesso',
        data: confirm,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';

      if (errorMessage === 'Motorista não encontrado') {
        return res.status(404).json({
          message: 'Motorista não encontrado',
          data: {
            error_code: 'DRIVER_NOT_FOUND',
            error_description: errorMessage,
          },
        });
      }

      if (errorMessage === 'Quilometragem inválida para o motorista') {
        return res.status(406).json({
          message: 'Quilometragem inválida para o motorista',
          data: {
            error_code: 'INVALID_DISTANCE',
            error_description: errorMessage,
          },
        });
      }

      return res.status(400).json({
        message: 'Os dados fornecidos no corpo da requisição são inválidos',
        data: {
          error_code: 'INVALID_DATA',
          error_description: errorMessage,
        },
      });
    }
  }
);

rideRouter.get(
  '/:customer_id',
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { customer_id } = req.params;
      const { driver_id } = req.query;

      const result = await findByCustomerAndDriverUseCase.execute({
        customer_id,
        driver_id: driver_id as string,
      });

      if (!result.rides || result.rides.length === 0) {
        return res.status(404).json({
          message: 'Nenhum registro encontrado',
          data: {
            error_code: 'NO_RIDES_FOUND',
            error_description:
              'Não foram encontradas corridas para os parâmetros fornecidos.',
          },
        });
      }

      res.status(200).json({
        message: 'Operação realizada com sucesso',
        data: result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        message: 'Motorista invalido',
        data: {
          error_code: 'INVALID_DRIVER',
          error_description: err.message,
        },
      });
    }
  }
);

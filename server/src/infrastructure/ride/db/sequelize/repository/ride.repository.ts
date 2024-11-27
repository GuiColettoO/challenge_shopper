import { NotFoundError } from '../../../../../@shared/domain/errors/not-found.error';
import { Ride } from '../../../../../domain/ride/entity/ride.entity';
import RideRepositoryInterface from '../../../../../domain/ride/repository/ride.repository';
import { RideModelMapper } from '../mapper/ride.mapper';
import { RideModel } from '../model/ride.model';
import { CustomerModel } from '../../../../customer/db/sequelize/model/customer.model';
import { DriverModel } from '../../../../driver/db/sequelize/model/driver.model';

export class RideSequelizeRepository implements RideRepositoryInterface {
  constructor(private rideModel: typeof RideModel) {}

  async create(entity: Ride): Promise<void> {
    const modelProps = RideModelMapper.toModel(entity);
    await this.rideModel.create(modelProps.toJSON());
  }

  async update(entity: Ride): Promise<void> {
    const id = entity.ride_id.id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    const modelProps = RideModelMapper.toModel(entity);
    await this.rideModel.update(modelProps.toJSON(), {
      where: { ride_id: id },
    });
  }

  async delete(ride_id: string): Promise<void> {
    const id = ride_id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    await this.rideModel.destroy({ where: { ride_id: id } });
  }

  async find(entity_id: string): Promise<Ride | null> {
    const model = await this._get(entity_id);

    return model ? RideModelMapper.toEntity(model) : null;
  }

  private async _get(id: string) {
    return await this.rideModel.findOne({
      where: {
        ride_id: id,
      },
    });
  }

  async findAll(): Promise<Ride[]> {
    const models = await this.rideModel.findAll();
    return models.map((model) => {
      return RideModelMapper.toEntity(model);
    });
  }

  async findByCustomerAndDriver(
    customer_id: string,
    driver_id?: string
  ): Promise<Ride[]> {
    const whereClause: any = {};

    if (customer_id) {
      whereClause['$customer.customer_id$'] = customer_id;
    }

    if (driver_id) {
      whereClause['$driver.driver_id$'] = driver_id;
    }

    const models = await this.rideModel.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: CustomerModel,
          as: 'customer',
          required: true,
        },
        {
          model: DriverModel,
          as: 'driver',
          required: false,
          attributes: ['driver_id', 'name'],
        },
      ],
    });

    return models.map((model) => RideModelMapper.toEntityWithDriver(model));
  }

  getEntity(): new (...args: any[]) => Ride {
    return Ride;
  }
}

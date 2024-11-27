import { NotFoundError } from '../../../../../@shared/domain/errors/not-found.error';
import { Driver } from '../../../../../domain/driver/entity/driver.entity';
import DriverRepositoryInterface from '../../../../../domain/driver/repository/driver.interface.repository';
import { DriverModelMapper } from '../mapper/driver.mapper';
import { DriverModel } from '../model/driver.model';

export class DriverSequelizeRepository implements DriverRepositoryInterface {
  constructor(private driverModel: typeof DriverModel) {}

  async create(entity: Driver): Promise<void> {
    const modelProps = DriverModelMapper.toModel(entity);
    await this.driverModel.create(modelProps.toJSON());
  }

  async update(entity: Driver): Promise<void> {
    const id = entity.driver_id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    const modelProps = DriverModelMapper.toModel(entity);
    await this.driverModel.update(modelProps.toJSON(), {
      where: { driver_id: id },
    });
  }

  async delete(driver_id: string): Promise<void> {
    const id = driver_id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    await this.driverModel.destroy({ where: { driver_id: id } });
  }

  async find(entity_id: string): Promise<Driver | null> {
    const model = await this._get(entity_id);

    return model ? DriverModelMapper.toEntity(model) : null;
  }

  private async _get(id: string) {
    return await this.driverModel.findByPk(id);
  }

  async findAll(): Promise<Driver[]> {
    const models = await this.driverModel.findAll();
    return models.map((model) => {
      return DriverModelMapper.toEntity(model);
    });
  }

  getEntity(): new (...args: any[]) => Driver {
    return Driver;
  }
}

import { Driver } from '../../../../../domain/driver/entity/driver.entity';
import { DriverModel } from '../model/driver.model';

export class DriverModelMapper {
  static toModel(entity: Driver): DriverModel {
    return DriverModel.build({
      driver_id: entity.driver_id,
      name: entity.name,
      description: entity.description,
      vehicle: entity.vehicle,
      comment: entity.comment,
      rating: entity.rating,
      minimumKm: entity.minimumKm,
    });
  }

  static toEntity(model: DriverModel): Driver {
    return new Driver({
      driver_id: model.driver_id,
      name: model.name,
      description: model.description,
      vehicle: model.vehicle,
      comment: model.comment,
      rating: model.rating,
      minimumKm: model.minimumKm,
    });
  }
}

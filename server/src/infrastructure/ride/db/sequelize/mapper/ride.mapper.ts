import { Uuid } from '../../../../../@shared/domain/value-objects/uuid/uuid.vo';
import { Driver } from '../../../../../domain/driver/entity/driver.entity';
import { Ride } from '../../../../../domain/ride/entity/ride.entity';
import { RideModel } from '../model/ride.model';

export class RideModelMapper {
  static toModel(entity: Ride): RideModel {
    return RideModel.build({
      ride_id: entity.ride_id.id,
      origin: entity.origin,
      destination: entity.destination,
      duration: entity.duration ?? null,
      distance: entity.distance ?? null,
      value: entity.value ?? null,
      customer_id: entity.customer_id ?? null,
      driver_id: entity.driver_id ?? null,
      created_at: entity.created_at,
    });
  }

  static toEntity(model: RideModel): Ride {
    return new Ride({
      ride_id: new Uuid(model.ride_id),
      origin: model.origin,
      destination: model.destination,
      duration: model.duration ?? null,
      distance: model.distance ?? null,
      value: model.value ?? null,
      customer_id: model.customer_id ?? null,
      driver_id: model.driver_id ?? null,
      created_at: model.created_at,
    });
  }

  static toEntityWithDriver(model: RideModel): Ride {
    const entity = RideModelMapper.toEntity(model);

    if (model.driver) {
      entity.driver = new Driver({
        driver_id: model.driver.driver_id,
        name: model.driver.name,
        description: model.driver.description ?? null,
        vehicle: model.driver.vehicle ?? null,
        rating: model.driver.rating ?? null,
        comment: model.driver.comment ?? null,
        minimumKm: model.driver.minimumKm ?? null,
      });
    }

    return entity;
  }
}

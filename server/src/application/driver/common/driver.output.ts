import { Driver } from '../../../domain/driver/entity/driver.entity';

export type DriverOutput = {
  driver_id: string;
  name: string;
  description: string;
  vehicle: string;
  comment: string;
  rating: number;
  minimumKm: number;
};

export class DriverOutputMapper {
  static toOutput(entity: Driver): DriverOutput {
    const { driver_id, ...otherProps } = entity.toJSON();
    return {
      driver_id: entity.driver_id,
      ...otherProps,
    };
  }
}

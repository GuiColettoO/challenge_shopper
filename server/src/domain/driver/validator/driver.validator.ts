import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import { Driver } from '../entity/driver.entity';

export class DriverRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  driver_id: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  vehicle: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNumber()
  @IsNotEmpty()
  minimumKm: number;

  constructor({
    driver_id,
    name,
    description,
    vehicle,
    comment,
    rating,
    minimumKm,
  }: Driver) {
    Object.assign(this, {
      driver_id,
      name,
      description,
      vehicle,
      comment,
      rating,
      minimumKm,
    });
  }
}

export class DriverValidator extends ClassValidatorFields<DriverRules> {
  validate(entity: Driver) {
    return super.validate(new DriverRules(entity));
  }
}

export class DriverValidatorFactory {
  static create() {
    return new DriverValidator();
  }
}

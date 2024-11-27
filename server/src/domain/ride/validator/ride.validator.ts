import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import { Ride } from '../entity/ride.entity';

export class RideRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  origin: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  destination: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  duration?: string | null;

  @IsNumber()
  @IsOptional()
  distance?: number | null;

  @IsNumber()
  @IsOptional()
  value?: number | null;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  customer_id?: string | null;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  driver_id?: string | null;

  constructor({
    origin,
    destination,
    duration,
    distance,
    value,
    customer_id,
    driver_id,
  }: Ride) {
    Object.assign(this, {
      origin,
      destination,
      duration,
      distance,
      value,
      customer_id,
      driver_id,
    });
  }
}

export class RideValidator extends ClassValidatorFields<RideRules> {
  validate(entity: Ride) {
    return super.validate(new RideRules(entity));
  }
}

export class RideValidatorFactory {
  static create() {
    return new RideValidator();
  }
}

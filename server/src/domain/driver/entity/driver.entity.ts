import { Entity } from '../../../@shared/domain/entity/entity';
import { EntityValidationError } from '../../../@shared/domain/validators/validation.error';
import { Ride } from '../../ride/entity/ride.entity';
import { DriverValidatorFactory } from '../validator/driver.validator';

type DriverProps = {
  driver_id: string;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  minimumKm: number;
};

type DriverCreateCommand = {
  driver_id: string;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  minimumKm: number;
};

export class Driver extends Entity {
  driver_id: string;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  minimumKm: number;

  rides?: Ride[];

  constructor(props: DriverProps) {
    super();
    this.driver_id = props.driver_id;
    this.name = props.name;
    this.description = props.description;
    this.vehicle = props.vehicle;
    this.rating = props.rating;
    this.comment = props.comment;
    this.minimumKm = props.minimumKm;
  }

  static create(command: DriverCreateCommand): Driver {
    const driver = new Driver(command);
    Driver.validate(driver);
    return driver;
  }

  changeName(name: string) {
    this.name = name;
    Driver.validate(this);
  }

  static validate(entity: Driver) {
    const validator = DriverValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  addRide(ride: Ride) {
    if (!this.rides.includes(ride)) {
      ride.setDriver(this);
      this.rides.push(ride);
    }
  }

  toJSON() {
    return {
      driver_id: this.driver_id,
      name: this.name,
      description: this.description,
      vehicle: this.vehicle,
      rating: this.rating,
      comment: this.comment,
      minimumKm: this.minimumKm,
    };
  }
}

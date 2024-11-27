import { Entity } from '../../../@shared/domain/entity/entity';
import { EntityValidationError } from '../../../@shared/domain/validators/validation.error';
import { Uuid } from '../../../@shared/domain/value-objects/uuid/uuid.vo';
import { Customer } from '../../customer/entity/customer.entity';
import { Driver } from '../../driver/entity/driver.entity';
import { RideValidatorFactory } from '../validator/ride.validator';

type RideProps = {
  ride_id?: Uuid;
  origin: string;
  destination: string;
  duration?: string;
  distance?: number;
  value?: number;
  created_at?: Date;

  customer_id?: string;

  driver_id?: string;
};

type RideCreateCommand = {
  ride_id?: Uuid;
  origin: string;
  destination: string;
  duration?: string;
  distance?: number;
  value?: number;
  created_at?: Date;

  customer_id?: string;

  driver_id?: string;
};

export class Ride extends Entity {
  ride_id?: Uuid;
  origin: string;
  destination: string;
  duration?: string;
  distance?: number;
  value?: number;
  created_at?: Date;

  customer_id?: string;

  driver_id?: string;
  driver?: Driver;

  constructor(props: RideProps) {
    super();
    this.ride_id = props.ride_id ?? new Uuid();
    this.origin = props.origin;
    this.destination = props.destination;
    this.duration = props.duration ?? null;
    this.distance = props.distance ?? null;
    this.value = props.value ?? null;
    this.created_at = props.created_at ?? new Date();
    this.customer_id = props.customer_id ?? null;
    this.driver_id = props.driver_id ?? null;
  }

  static create(command: RideCreateCommand): Ride {
    const ride = new Ride(command);
    Ride.validate(ride);
    Ride.validateAddress(ride);
    return ride;
  }

  static validate(entity: Ride) {
    const validator = RideValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  static validateAddress(entity: Ride) {
    if (entity.origin === entity.destination) {
      throw new Error('Origin and destination must be different');
    }
  }

  setCustomer(customer: Customer) {
    this.customer_id = customer.customer_id;
    Ride.validate(this);
  }

  setDriver(driver: Driver) {
    this.driver = driver;
    this.driver_id = driver.driver_id;
    Ride.validate(this);
  }

  toJSON() {
    return {
      ride_id: this.ride_id.id,
      origin: this.origin,
      destination: this.destination,
      duration: this.duration ?? null,
      distance: this.distance ?? null,
      value: this.value ?? null,
      created_at: this.created_at,
      customer_id: this.customer_id ?? null,
      driver_id: this.driver_id ?? null,
    };
  }
}

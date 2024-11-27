import { Entity } from '../../../@shared/domain/entity/entity';
import { EntityValidationError } from '../../../@shared/domain/validators/validation.error';
import { Driver } from '../../driver/entity/driver.entity';
import { Ride } from '../../ride/entity/ride.entity';
import { CustomerValidatorFactory } from '../validator/customer.validator';

type CustomerProps = {
  customer_id: string;
  created_at?: Date;
};

type CustomerCreateCommand = {
  customer_id: string;
  created_at?: Date;
};

export class Customer extends Entity {
  customer_id: string;
  created_at?: Date;

  rides?: Ride[];

  constructor(props: CustomerProps) {
    super();
    this.customer_id = props.customer_id;
    this.created_at = props.created_at ?? new Date();
  }

  static create(command: CustomerCreateCommand): Customer {
    const customer = new Customer(command);
    Customer.validate(customer);
    return customer;
  }

  static validate(entity: Customer) {
    const validator = CustomerValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  addRide(ride: Ride) {
    if (!this.rides.includes(ride)) {
      ride.setCustomer(this);
      this.rides.push(ride);
    }
  }

  toJSON() {
    return {
      customer_id: this.customer_id,
      created_at: this.created_at,
    };
  }
}

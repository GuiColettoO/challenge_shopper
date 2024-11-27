import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Customer } from '../entity/customer.entity';
import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';

export class CustomerRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  constructor({ customer_id }: Customer) {
    Object.assign(this, { customer_id });
  }
}

export class CustomerValidator extends ClassValidatorFields<CustomerRules> {
  validate(entity: Customer) {
    return super.validate(new CustomerRules(entity));
  }
}

export class CustomerValidatorFactory {
  static create() {
    return new CustomerValidator();
  }
}

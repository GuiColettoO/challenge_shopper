import { Customer } from '../../../../../domain/customer/entity/customer.entity';
import { CustomerModel } from '../model/customer.model';

export class CustomerModelMapper {
  static toModel(entity: Customer): CustomerModel {
    return CustomerModel.build({
      customer_id: entity.customer_id,
      created_at: entity.created_at,
    });
  }

  static toEntity(model: CustomerModel): Customer {
    return new Customer({
      customer_id: model.customer_id,
      created_at: model.created_at,
    });
  }
}

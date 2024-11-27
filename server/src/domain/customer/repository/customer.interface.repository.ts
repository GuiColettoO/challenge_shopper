import RepositoryInterface from '../../../@shared/domain/repository/repository-interface';
import { Customer } from '../entity/customer.entity';

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}

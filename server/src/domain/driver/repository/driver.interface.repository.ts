import RepositoryInterface from '../../../@shared/domain/repository/repository-interface';
import { Driver } from '../entity/driver.entity';

export default interface DriverRepositoryInterface
  extends RepositoryInterface<Driver> {}

import RepositoryInterface from '../../../@shared/domain/repository/repository-interface';
import { Ride } from '../entity/ride.entity';

export default interface RideRepositoryInterface
  extends RepositoryInterface<Ride> {
  findByCustomerAndDriver(
    customer_id: string,
    driver_id?: string
  ): Promise<Ride[]>;
}

import { IUseCase } from '../../../@shared/application/use-case.interface';
import RideRepositoryInterface from '../../../domain/ride/repository/ride.repository';
import { Ride } from '../../../domain/ride/entity/ride.entity';
import { RideInputDto } from '../dto/ride.input.dto';
import { RideOutputDto } from '../dto/ride.output.dto';

export class FindRidesByCustomerAndDriverUseCase
  implements IUseCase<FindRidesInput, FindRidesOutput>
{
  constructor(private readonly rideRepo: RideRepositoryInterface) {}

  async execute(input: FindRidesInput): Promise<FindRidesOutput> {
    const rides: Ride[] = await this.rideRepo.findByCustomerAndDriver(
      input.customer_id,
      input.driver_id
    );

    const rideDetails = rides.map((ride) => ({
      id: ride.ride_id.id,
      origin: ride.origin,
      destination: ride.destination,
      duration: ride.duration,
      distance: ride.distance,
      customer_id: ride.customer_id,
      driver: ride.driver
        ? {
            id: ride.driver.driver_id,
            name: ride.driver.name,
          }
        : null,
      value: ride.value,
      created_at: ride.created_at,
    }));

    return { rides: rideDetails };
  }
}

export type FindRidesInput = RideInputDto;
export type FindRidesOutput = RideOutputDto;

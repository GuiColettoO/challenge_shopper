import { IUseCase } from '../../../@shared/application/use-case.interface';
import { GoogleMapsApiInterface } from '../../../@shared/domain/repository/google-api-repository-interface/google-maps-api.interface';
import { Customer } from '../../../domain/customer/entity/customer.entity';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.interface.repository';
import { Driver } from '../../../domain/driver/entity/driver.entity';
import DriverRepositoryInterface from '../../../domain/driver/repository/driver.interface.repository';
import RideRepositoryInterface from '../../../domain/ride/repository/ride.repository';
import { EstimateInput } from '../dto/input/estimate.input';
import { EstimateOutput } from '../dto/output/estimate.output';

export class CreateEstimateUseCase
  implements IUseCase<CreateEstimateInput, CreateEstimateOutput>
{
  constructor(
    private readonly driverRepo: DriverRepositoryInterface,
    private readonly customerRepo: CustomerRepositoryInterface,
    private readonly googleMapsApiRepo: GoogleMapsApiInterface
  ) {}

  async execute(input: CreateEstimateInput): Promise<CreateEstimateOutput> {
    const customerEntity = await this.customerRepo.find(input.customer_id);

    if (!customerEntity) {
      const entity = Customer.create({ customer_id: input.customer_id });
      await this.customerRepo.create(entity);
    }

    const locationInfo = await this.googleMapsApiRepo.getRoute(
      input.origin,
      input.destination
    );

    const drivers: Driver[] = await this.driverRepo.findAll();

    const distanceInKm = locationInfo.distance.value / 1000;

    const options = drivers
      .filter((driver) => driver.minimumKm <= distanceInKm)
      .map((driver) => ({
        id: driver.driver_id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating,
          comment: driver.comment,
        },
        value: value(driver.rating, distanceInKm),
      }));

    return {
      origin: {
        latitude: locationInfo.start_location.lat,
        longitude: locationInfo.start_location.lng,
      },
      destination: {
        latitude: locationInfo.end_location.lat,
        longitude: locationInfo.end_location.lng,
      },
      distance: locationInfo.distance.value / 1000,
      duration: locationInfo.duration.text,
      options: options,
      routeResponse: locationInfo,
    };
  }
}

export type CreateEstimateInput = EstimateInput;

export type CreateEstimateOutput = EstimateOutput;

export function value(rating: number, distance: number): number {
  const valueStr = (rating * distance).toFixed(2);
  return parseFloat(valueStr);
}

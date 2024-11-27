import { IUseCase } from '../../../@shared/application/use-case.interface';
import { Ride } from '../../../domain/ride/entity/ride.entity';
import RideRepositoryInterface from '../../../domain/ride/repository/ride.repository';
import { ConfirmInputDto } from '../dto/confirm-input.dto';
import { ConfirmOutputDto } from '../dto/confirm-output.dto';

export class CreateConfirmUseCase
  implements IUseCase<ConfirmInputDto, ConfirmOutputDto>
{
  constructor(private readonly rideRepo: RideRepositoryInterface) {}

  async execute(input: ConfirmInputDto): Promise<ConfirmOutputDto> {
    const rideEntity = Ride.create({
      origin: input.origin,
      destination: input.destination,
      duration: input.duration,
      distance: input.distance,
      value: input.value,
      customer_id: input.customer_id,
      driver_id: input.driver.id.toString(),
    });

    await this.rideRepo.create(rideEntity);

    return { success: true };
  }
}

export type CreateConfirmInput = ConfirmInputDto;

export type CreateConfirmOutput = ConfirmOutputDto;

import { IUseCase } from '../../../@shared/application/use-case.interface';
import { Driver } from '../../../domain/driver/entity/driver.entity';
import DriverRepositoryInterface from '../../../domain/driver/repository/driver.interface.repository';
import { DriverOutput, DriverOutputMapper } from '../common/driver.output';

export class CreateDriverUseCase
  implements IUseCase<CreateDriverInput, CreateDriverOutput>
{
  constructor(private readonly userRepo: DriverRepositoryInterface) {}

  async execute(input: CreateDriverInput): Promise<CreateDriverOutput> {
    const entity = Driver.create(input);

    await this.userRepo.create(entity);

    return DriverOutputMapper.toOutput(entity);
  }
}

export type CreateDriverInput = {
  driver_id: string;
  name: string;
  description: string;
  vehicle: string;
  comment: string;
  rating: number;
  minimumKm: number;
};

export type CreateDriverOutput = DriverOutput;

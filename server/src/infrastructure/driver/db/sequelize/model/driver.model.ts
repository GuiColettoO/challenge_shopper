import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RideModel } from '../../../../ride/db/sequelize/model/ride.model';

@Table({ tableName: 'drivers', timestamps: false })
export class DriverModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare driver_id: string;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.STRING })
  declare vehicle: string;

  @Column({ type: DataType.STRING })
  declare comment: string;

  @Column({ type: DataType.INTEGER })
  declare rating: number;

  @Column({ type: DataType.INTEGER })
  declare minimumKm: number;

  @HasMany(() => RideModel)
  declare rides: RideModel[];
}

import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RideModel } from '../../../../ride/db/sequelize/model/ride.model';

@Table({ tableName: 'customers', timestamps: false })
export class CustomerModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare customer_id: string;

  @Column({ allowNull: false, type: DataType.DATE() })
  declare created_at: Date;

  @HasMany(() => RideModel)
  declare rides: RideModel[];
}

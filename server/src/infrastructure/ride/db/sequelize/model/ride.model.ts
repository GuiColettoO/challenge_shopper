import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CustomerModel } from '../../../../customer/db/sequelize/model/customer.model';
import { DriverModel } from '../../../../driver/db/sequelize/model/driver.model';

@Table({ tableName: 'rides', timestamps: false })
export class RideModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare ride_id: string;

  @Column({ type: DataType.STRING })
  declare origin: string;

  @Column({ type: DataType.STRING })
  declare destination: string;

  @Column({ allowNull: true, type: DataType.STRING })
  declare duration: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  declare distance: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  declare value: number;

  @Column({ allowNull: false, type: DataType.DATE() })
  declare created_at: Date;

  @ForeignKey(() => CustomerModel)
  @Column({ type: DataType.STRING })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @ForeignKey(() => DriverModel)
  @Column({ type: DataType.STRING })
  declare driver_id: string;

  @BelongsTo(() => DriverModel)
  declare driver: DriverModel;
}

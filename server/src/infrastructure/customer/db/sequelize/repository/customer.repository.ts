import { NotFoundError } from '../../../../../@shared/domain/errors/not-found.error';
import { Customer } from '../../../../../domain/customer/entity/customer.entity';
import CustomerRepositoryInterface from '../../../../../domain/customer/repository/customer.interface.repository';
import { CustomerModelMapper } from '../mapper/customer.mapper';
import { CustomerModel } from '../model/customer.model';

export class CustomerSequelizeRepository
  implements CustomerRepositoryInterface
{
  constructor(private customerModel: typeof CustomerModel) {}

  async create(entity: Customer): Promise<void> {
    const modelProps = CustomerModelMapper.toModel(entity);
    await this.customerModel.create(modelProps.toJSON());
    // console.log('Model Props:', modelProps.toJSON());
  }

  async update(entity: Customer): Promise<void> {
    const id = entity.customer_id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    const modelProps = CustomerModelMapper.toModel(entity);
    await this.customerModel.update(modelProps.toJSON(), {
      where: { customer_id: id },
    });
  }

  async delete(customer_id: string): Promise<void> {
    const id = customer_id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    await this.customerModel.destroy({ where: { customer_id: id } });
  }

  async find(entity_id: string): Promise<Customer | null> {
    const model = await this._get(entity_id);

    return model ? CustomerModelMapper.toEntity(model) : null;
  }

  private async _get(id: string) {
    return await this.customerModel.findByPk(id);
  }

  async findAll(): Promise<Customer[]> {
    const models = await this.customerModel.findAll();
    return models.map((model) => {
      return CustomerModelMapper.toEntity(model);
    });
  }

  getEntity(): new (...args: any[]) => Customer {
    return Customer;
  }
}

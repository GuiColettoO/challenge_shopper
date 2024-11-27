import { Driver } from '../../../../domain/driver/entity/driver.entity';
import { DriverOutputMapper } from '../driver.output';

describe('DriverOutputMapper Unit Tests', () => {
  test('should convert a Driver with user in output', () => {
    const entity = Driver.create({
      driver_id: '2321312fdfsd342',
      name: 'Homer Simpson',
      description: 'Ola eu sou Homer',
      vehicle: 'Plymouth Valiant 1962',
      comment: '2/5 estrelas',
      rating: 2.5,
      minimumKm: 1,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = DriverOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      driver_id: entity.driver_id,
      name: entity.name,
      description: entity.description,
      vehicle: entity.vehicle,
      comment: entity.comment,
      rating: entity.rating,
      minimumKm: entity.minimumKm,
    });
  });
});

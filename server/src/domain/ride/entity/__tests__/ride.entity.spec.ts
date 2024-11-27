import { Uuid } from '../../../../@shared/domain/value-objects/uuid/uuid.vo';
import { Ride } from '../ride.entity';

describe('Ride unit test', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Ride, 'validate');
  });

  describe('constructor', () => {
    test('should create a ride', () => {
      const ride = new Ride({
        origin: 'Avenida Paulista',
        destination: 'Rua Costa Aguiar',
      });
      expect(ride.ride_id).toBeInstanceOf(Uuid);
      expect(ride.origin).toBe('Avenida Paulista');
      expect(ride.destination).toBe('Rua Costa Aguiar');
      expect(ride.created_at).toBeInstanceOf(Date);
    });

    test('should create a ride with all attributes', () => {
      const created_at = new Date();
      const ride = new Ride({
        ride_id: new Uuid(),
        origin: 'Avenida Paulista',
        destination: 'Rua Costa Aguiar',
        duration: '10 minutos',
        distance: 10,
        value: 100,
        customer_id: '123',
        driver_id: '321',
        created_at,
      });
      expect(ride.ride_id).toBeInstanceOf(Uuid);
      expect(ride.origin).toBe('Avenida Paulista');
      expect(ride.destination).toBe('Rua Costa Aguiar');
      expect(ride.duration).toBe('10 minutos');
      expect(ride.distance).toBe(10);
      expect(ride.value).toBe(100);
      expect(ride.customer_id).toBe('123');
      expect(ride.driver_id).toBe('321');
      expect(ride.created_at).toBe(created_at);
    });
  });

  describe('create command', () => {
    test('should create a ride)', () => {
      const ride = Ride.create({
        origin: 'Avenida Paulista',
        destination: 'Rua Costa Aguiar',
      });
      // expect(ride.ride_id).toBeInstanceOf(Uuid);
      expect(ride.origin).toBe('Avenida Paulista');
      expect(ride.destination).toBe('Rua Costa Aguiar');
      expect(ride.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a ride with all attributes', () => {
      const created_at = new Date();
      const ride = Ride.create({
        ride_id: new Uuid(),
        origin: 'Avenida Paulista',
        destination: 'Rua Costa Aguiar',
        duration: '10 minutos',
        distance: 10,
        value: 100,
        customer_id: '123',
        driver_id: '321',
        created_at,
      });
      // expect(ride.ride_id).toBeInstanceOf(Uuid);
      expect(ride.origin).toBe('Avenida Paulista');
      expect(ride.destination).toBe('Rua Costa Aguiar');
      expect(ride.duration).toBe('10 minutos');
      expect(ride.distance).toBe(10);
      expect(ride.value).toBe(100);
      expect(ride.customer_id).toBe('123');
      expect(ride.driver_id).toBe('321');
      expect(ride.created_at).toBe(created_at);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ride Validator', () => {
    describe('create command', () => {
      test('should an invalid ride with name, password, email and accessType property', () => {
        const arrange = [];

        expect(() =>
          Ride.create({
            ride_id: null,
            origin: null,
            destination: null,
            duration: null,
            distance: null,
            value: null,
            customer_id: null,
            driver_id: null,
          })
        ).containsErrorMessages({
          origin: [
            'origin should not be empty',
            'origin must be a string',
            'origin must be shorter than or equal to 255 characters',
          ],
          destination: [
            'destination should not be empty',
            'destination must be a string',
            'destination must be shorter than or equal to 255 characters',
          ],
        });

        expect(() =>
          Ride.create({
            ride_id: undefined,
            origin: '',
            destination: '',
            duration: '',
            distance: undefined,
            value: undefined,
            customer_id: '',
            driver_id: '',
          })
        ).containsErrorMessages({
          origin: ['origin should not be empty'],
          destination: ['destination should not be empty'],
        });

        expect(() =>
          Ride.create({
            ride_id: 5 as any,
            origin: 5 as any,
            destination: 5 as any,
            duration: 5 as any,
            distance: '' as any,
            value: '' as any,
            customer_id: 5 as any,
            driver_id: 5 as any,
          })
        ).containsErrorMessages({
          origin: [
            'origin must be a string',
            'origin must be shorter than or equal to 255 characters',
          ],
          destination: [
            'destination must be a string',
            'destination must be shorter than or equal to 255 characters',
          ],
          duration: [
            'duration must be a string',
            'duration must be shorter than or equal to 255 characters',
          ],
          distance: [
            'distance must be a number conforming to the specified constraints',
          ],
          value: [
            'value must be a number conforming to the specified constraints',
          ],
          customer_id: [
            'customer_id must be a string',
            'customer_id must be shorter than or equal to 255 characters',
          ],
          driver_id: [
            'driver_id must be a string',
            'driver_id must be shorter than or equal to 255 characters',
          ],
        });
      });
    });
  });
});

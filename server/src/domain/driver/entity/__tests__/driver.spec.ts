import { Driver } from '../driver.entity';

describe('Driver unit test', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Driver, 'validate');
  });

  describe('constructor', () => {
    test('should create a driver', () => {
      const driver = new Driver({
        driver_id: '2321312fdfsd342',
        name: 'Homer Simpson',
        description: 'Ola eu sou Homer',
        vehicle: 'Plymouth Valiant 1962',
        comment: '2/5 estrelas',
        rating: 2.5,
        minimumKm: 1,
      });
      expect(driver.driver_id).toBe('2321312fdfsd342');
      expect(driver.name).toBe('Homer Simpson');
      expect(driver.description).toBe('Ola eu sou Homer');
      expect(driver.vehicle).toBe('Plymouth Valiant 1962');
      expect(driver.comment).toBe('2/5 estrelas');
      expect(driver.rating).toBe(2.5);
      expect(driver.minimumKm).toBe(1);
    });
  });

  describe('create command', () => {
    test('should create a driver)', () => {
      const driver = Driver.create({
        driver_id: '2321312fdfsd342',
        name: 'Homer Simpson',
        description: 'Ola eu sou Homer',
        vehicle: 'Plymouth Valiant 1962',
        comment: '2/5 estrelas',
        rating: 2.5,
        minimumKm: 1,
      });
      expect(driver.driver_id).toBe('2321312fdfsd342');
      expect(driver.name).toBe('Homer Simpson');
      expect(driver.description).toBe('Ola eu sou Homer');
      expect(driver.vehicle).toBe('Plymouth Valiant 1962');
      expect(driver.comment).toBe('2/5 estrelas');
      expect(driver.rating).toBe(2.5);
      expect(driver.minimumKm).toBe(1);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Driver Validator', () => {
    describe('create command', () => {
      test('should an invalid driver with name, password, email and accessType property', () => {
        const arrange = [];

        expect(() =>
          Driver.create({
            driver_id: null,
            name: null,
            description: null,
            vehicle: null,
            comment: null,
            rating: null,
            minimumKm: null,
          })
        ).containsErrorMessages({
          driver_id: [
            'driver_id should not be empty',
            'driver_id must be a string',
            'driver_id must be shorter than or equal to 255 characters',
          ],
          name: [
            'name should not be empty',
            'name must be a string',
            'name must be shorter than or equal to 255 characters',
          ],
          description: [
            'description should not be empty',
            'description must be a string',
            'description must be shorter than or equal to 255 characters',
          ],
          vehicle: [
            'vehicle should not be empty',
            'vehicle must be a string',
            'vehicle must be shorter than or equal to 255 characters',
          ],
          comment: [
            'comment should not be empty',
            'comment must be a string',
            'comment must be shorter than or equal to 255 characters',
          ],
          rating: [
            'rating should not be empty',
            'rating must be a number conforming to the specified constraints',
          ],
          minimumKm: [
            'minimumKm should not be empty',
            'minimumKm must be a number conforming to the specified constraints',
          ],
        });

        expect(() =>
          Driver.create({
            driver_id: '',
            name: '',
            description: '',
            vehicle: '',
            comment: '',
            rating: undefined,
            minimumKm: undefined,
          })
        ).containsErrorMessages({
          driver_id: ['driver_id should not be empty'],
          name: ['name should not be empty'],
          description: ['description should not be empty'],
          vehicle: ['vehicle should not be empty'],
          comment: ['comment should not be empty'],
          rating: [
            'rating should not be empty',
            'rating must be a number conforming to the specified constraints',
          ],
          minimumKm: [
            'minimumKm should not be empty',
            'minimumKm must be a number conforming to the specified constraints',
          ],
        });

        expect(() =>
          Driver.create({
            driver_id: 5 as any,
            name: 5 as any,
            description: 5 as any,
            vehicle: 5 as any,
            comment: 5 as any,
            rating: '' as any,
            minimumKm: '' as any,
          })
        ).containsErrorMessages({
          driver_id: [
            'driver_id must be a string',
            'driver_id must be shorter than or equal to 255 characters',
          ],
          name: [
            'name must be a string',
            'name must be shorter than or equal to 255 characters',
          ],
          description: [
            'description must be a string',
            'description must be shorter than or equal to 255 characters',
          ],
          vehicle: [
            'vehicle must be a string',
            'vehicle must be shorter than or equal to 255 characters',
          ],
          comment: [
            'comment must be a string',
            'comment must be shorter than or equal to 255 characters',
          ],
          rating: [
            'rating should not be empty',
            'rating must be a number conforming to the specified constraints',
          ],
          minimumKm: [
            'minimumKm should not be empty',
            'minimumKm must be a number conforming to the specified constraints',
          ],
        });
      });
    });
  });
});

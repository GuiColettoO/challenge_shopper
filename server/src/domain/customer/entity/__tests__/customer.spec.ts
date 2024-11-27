import { Customer } from '../customer.entity';

describe('Customer unit test', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Customer, 'validate');
  });

  describe('constructor', () => {
    test('should create a customer', () => {
      const customer = new Customer({
        customer_id: '2321312fdfsd342',
      });
      expect(customer.customer_id).toBe('2321312fdfsd342');
    });
  });

  describe('create command', () => {
    test('should create a customer)', () => {
      const customer = Customer.create({
        customer_id: '2321312fdfsd342',
      });
      expect(customer.customer_id).toBe('2321312fdfsd342');
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Customer Validator', () => {
    describe('create command', () => {
      test('should an invalid customer with name, password, email and accessType property', () => {
        const arrange = [];

        expect(() =>
          Customer.create({
            customer_id: null,
          })
        ).containsErrorMessages({
          customer_id: [
            'customer_id should not be empty',
            'customer_id must be a string',
            'customer_id must be shorter than or equal to 255 characters',
          ],
        });

        expect(() =>
          Customer.create({
            customer_id: '',
          })
        ).containsErrorMessages({
          customer_id: ['customer_id should not be empty'],
        });

        expect(() =>
          Customer.create({
            customer_id: 5 as any,
          })
        ).containsErrorMessages({
          customer_id: [
            'customer_id must be a string',
            'customer_id must be shorter than or equal to 255 characters',
          ],
        });
      });
    });
  });
});

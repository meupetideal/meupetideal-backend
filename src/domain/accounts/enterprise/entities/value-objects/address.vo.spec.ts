import { Address } from './address.vo';
import { Country } from './country.vo';

describe('Address ValueObject', () => {
  test('constructor', () => {
    const addressValue = {
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
      country: Country.create('br'),
    };

    const address = Address.create(addressValue);

    expect(address.value).toEqual(addressValue);
  });

  it('should return true when calling equals() method on one Address object with the other Address object as argument', () => {
    const addressValue = {
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
      country: Country.create('br'),
    };

    const address1 = Address.create(addressValue);
    const address2 = Address.create(addressValue);

    const result = address1.equals(address2);

    expect(result).toBe(true);
  });
});

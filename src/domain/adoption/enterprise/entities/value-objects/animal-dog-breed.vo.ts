import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export enum AnimalDogBreedEnum {
  SRD = 'srd',
  AKITA_INU = 'akita-inu',
  AMERICAN_BULLY = 'american-bully',
  AMERICAN_PIT_BULL_TERRIER = 'american-pit-bull-terrier',
  AMERICAN_STAFFORDSHIRE_TERRIER = 'american-staffordshire-terrier',
  AUSTRALIAN_CATTLE_DOG = 'australian-cattle-dog',
  BASSET_HOUND = 'basset-hound',
  BEAGLE = 'beagle',
  BORDER_COLLIE = 'border-collie',
  BOSTON_TERRIER = 'boston-terrier',
  BOXER = 'boxer',
  BULLDOG = 'bulldog',
  BULLDOG_FRANCES = 'bulldog-frances',
  BULL_TERRIER = 'bull-terrier',
  CANE_CORSO = 'cane-corso',
  CAVALIER_KING_CHARLES_SPANIEL = 'cavalier-king-charles-spaniel',
  CHIHUAHUA = 'chihuahua',
  CHOW_CHOW = 'chow-chow',
  COCKER_SPANIEL = 'cocker-spaniel',
  DACHSHUND = 'dachshund',
  DALMATA = 'dalmata',
  DOBERMAN = 'doberman',
  DOGO_ARGENTINO = 'dogo-argentino',
  DOGUE_ALEMAO = 'dogue-alemao',
  FILA_BRASILEIRO = 'fila-brasileiro',
  FOX_TERRIER = 'fox-terrier',
  GOLDEN_RETRIEVER = 'golden-retriever',
  GRIFFON_DE_BRUXELAS = 'griffon-de-bruxelas',
  HUSKY_SIBERIANO = 'husky-siberiano',
  JACK_RUSSELL_TERRIER = 'jack-russell-terrier',
  LABRADOR_RETRIEVER = 'labrador-retriever',
  LHASA_APSO = 'lhasa-apso',
  MALTES = 'maltes',
  PASTOR_ALEMAO = 'pastor-alemao',
  PASTOR_AUSTRALIANO = 'pastor-australiano',
  PASTOR_BELGA = 'pastor-belga',
  PASTOR_HOLANDES = 'pastor-holandes',
  PEQUINES = 'pequines',
  PINSCHER = 'pinscher',
  PUG = 'pug',
  ROTTWEILER = 'rottweiler',
  SAMOIEDA = 'samoieda',
  SAO_BERNARDO = 'sao-bernardo',
  SCHNAUZER = 'schnauzer',
  SHAR_PEI = 'shar-pei',
  SHIBA_INU = 'shiba-inu',
  SHIH_TZU = 'shih-tzu',
  SPITZ_ALEMAO = 'spitz-alemao',
  YORKSHIRE_TERRIER = 'yorkshire-terrier',
}

export class AnimalDogBreed extends ValueObject<AnimalDogBreedEnum> {
  public static create(value: string | AnimalDogBreedEnum): AnimalDogBreed {
    const animalDogBreed = AnimalDogBreed.fromString(value);

    return new AnimalDogBreed(animalDogBreed);
  }

  public equals(valueObject: AnimalDogBreed): boolean {
    return this.value === valueObject.value;
  }

  static fromString(value: string): AnimalDogBreedEnum {
    const key = value.toUpperCase().replaceAll('-', '_');
    const valueExists = Object.keys(AnimalDogBreedEnum).includes(key);

    if (!valueExists) {
      throw new ValidationError(`Dog breed "${key}" is invalid`);
    }

    return AnimalDogBreedEnum[key];
  }
}

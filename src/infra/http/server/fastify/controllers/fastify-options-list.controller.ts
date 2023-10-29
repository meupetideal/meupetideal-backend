import { Controller } from '@core/infra/controller';
import {
  AnimalCatBreedEnum,
  animalCatBreedTranslations,
} from '@domain/adoption/enterprise/entities/value-objects/animal-cat-breed.vo';
import {
  AnimalCoatColorEnum,
  animalCoatColorTranslations,
} from '@domain/adoption/enterprise/entities/value-objects/animal-coat-color.vo';
import {
  AnimalDogBreedEnum,
  animalDogBreedTranslations,
} from '@domain/adoption/enterprise/entities/value-objects/animal-dog-breed.vo';
import {
  AnimalGenderEnum,
  animalGenderTranslations,
} from '@domain/adoption/enterprise/entities/value-objects/animal-gender.vo';
import {
  AnimalSizeEnum,
  animalSizeTranslations,
} from '@domain/adoption/enterprise/entities/value-objects/animal-size.vo';
import {
  AnimalStatusEnum,
  animalStatusTranslations,
} from '@domain/adoption/enterprise/entities/value-objects/animal-status.vo';
import {
  AnimalTemperamentEnum,
  animalTemperamentTranslations,
} from '@domain/adoption/enterprise/entities/value-objects/animal-temperament.vo';
import { FastifyReply, FastifyRequest } from 'fastify';
import { EnumToOptionPipe } from 'src/infra/http/pipes/enum-to-option.pipe';

export class FastifyOptionsListController implements Controller {
  public async handle(_: FastifyRequest, reply: FastifyReply) {
    const data = [
      {
        name: 'coatColors',
        value: AnimalCoatColorEnum,
        translatedValues: animalCoatColorTranslations,
      },
      {
        name: 'genders',
        value: AnimalGenderEnum,
        translatedValues: animalGenderTranslations,
      },
      {
        name: 'sizes',
        value: AnimalSizeEnum,
        translatedValues: animalSizeTranslations,
      },
      {
        name: 'status',
        value: AnimalStatusEnum,
        translatedValues: animalStatusTranslations,
      },
      {
        name: 'temperaments',
        value: AnimalTemperamentEnum,
        translatedValues: animalTemperamentTranslations,
      },
      {
        name: 'catBreeds',
        value: AnimalCatBreedEnum,
        translatedValues: animalCatBreedTranslations,
      },
      {
        name: 'dogBreeds',
        value: AnimalDogBreedEnum,
        translatedValues: animalDogBreedTranslations,
      },
    ];

    const response = {};
    for (const { name, value, translatedValues } of data) {
      response[name] = EnumToOptionPipe.transform(value, translatedValues);
    }

    return reply.send(response);
  }
}

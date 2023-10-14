import { z } from 'zod';
import { Validator } from '@core/enterprise/validator';

const animalSchema = z.object({
  name: z.string().min(3).max(50),
  approximateAge: z.number(),
  approximateWeight: z.number(),
  isVaccinated: z.boolean(),
  isDewormed: z.boolean(),
  isNeutered: z.boolean(),
  isSpecialNeeds: z.boolean(),
});

type AnimalSchema = z.infer<typeof animalSchema>;

class AnimalValidator extends Validator<AnimalSchema> {
  protected schema = animalSchema;
}

export class AnimalValidatorFactory {
  static create() {
    return new AnimalValidator();
  }
}

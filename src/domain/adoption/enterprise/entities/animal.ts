import { Entity } from '@core/enterprise/entity';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { PickOut } from '@core/enterprise/logic/pick-out';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { AnimalValidatorFactory } from '../validators/animal.validator';
import { AnimalSize } from './value-objects/animal-size.vo';
import { AnimalGender } from './value-objects/animal-gender.vo';
import { AnimalTemperament } from './value-objects/animal-temperament.vo';
import { AnimalCoatColor } from './value-objects/animal-coat-color.vo';
import { AnimalStatus } from './value-objects/animal-status.vo';
import { AnimalPhotoList } from './animal-photo-list';

export interface AnimalProps {
  ownerId: UniqueEntityId;
  species: 'dog' | 'cat';
  name: string;
  gender: AnimalGender;
  approximateAge: number;
  approximateWeight: number;
  size: AnimalSize;
  temperaments: AnimalTemperament[];
  coatColors: AnimalCoatColor[];
  isVaccinated: boolean;
  isDewormed: boolean;
  isNeutered: boolean;
  isSpecialNeeds: boolean;
  status: AnimalStatus;
  photos: AnimalPhotoList;
}

export interface AnimalConstructor
  extends PickOut<AnimalProps, 'status' | 'photos'> {}

export abstract class Animal<ChildAnimalProps = unknown> extends Entity<
  AnimalProps & ChildAnimalProps
> {
  protected constructor(
    props: AnimalConstructor & ChildAnimalProps,
    id?: UniqueEntityId,
  ) {
    const propsWithStatusAndPhotos = {
      ...props,
      status: props.status ?? AnimalStatus.create('available'),
      photos: props.photos ?? new AnimalPhotoList(),
    };

    Animal.validate(propsWithStatusAndPhotos);
    super(propsWithStatusAndPhotos, id);
  }

  get ownerId(): UniqueEntityId {
    return this.props.ownerId;
  }

  set ownerId(ownerId: UniqueEntityId) {
    this.props.ownerId = ownerId;
    this._touch();
  }

  get species(): 'dog' | 'cat' {
    return this.props.species;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this._touch();
  }

  get gender(): AnimalGender {
    return this.props.gender;
  }

  set gender(gender: AnimalGender) {
    this.props.gender = gender;
    this._touch();
  }

  get approximateAge(): number {
    return this.props.approximateAge;
  }

  set approximateAge(approximateAge: number) {
    this.props.approximateAge = approximateAge;
    this._touch();
  }

  get approximateWeight(): number {
    return this.props.approximateWeight;
  }

  set approximateWeight(approximateWeight: number) {
    this.props.approximateWeight = approximateWeight;
    this._touch();
  }

  get size(): AnimalSize {
    return this.props.size;
  }

  set size(size: AnimalSize) {
    this.props.size = size;
    this._touch();
  }

  get temperaments(): AnimalTemperament[] {
    return this.props.temperaments;
  }

  set temperaments(temperaments: AnimalTemperament[]) {
    this.props.temperaments = temperaments;
    this._touch();
  }

  get coatColors(): AnimalCoatColor[] {
    return this.props.coatColors;
  }

  set coatColors(coatColors: AnimalCoatColor[]) {
    this.props.coatColors = coatColors;
    this._touch();
  }

  get isVaccinated(): boolean {
    return this.props.isVaccinated;
  }

  set isVaccinated(isVaccinated: boolean) {
    this.props.isVaccinated = isVaccinated;
    this._touch();
  }

  get isDewormed(): boolean {
    return this.props.isDewormed;
  }

  set isDewormed(isDewormed: boolean) {
    this.props.isDewormed = isDewormed;
    this._touch();
  }

  get isNeutered(): boolean {
    return this.props.isNeutered;
  }

  set isNeutered(isNeutered: boolean) {
    this.props.isNeutered = isNeutered;
    this._touch();
  }

  get isSpecialNeeds(): boolean {
    return this.props.isSpecialNeeds;
  }

  set isSpecialNeeds(isSpecialNeeds: boolean) {
    this.props.isSpecialNeeds = isSpecialNeeds;
    this._touch();
  }

  get status(): AnimalStatus {
    return this.props.status;
  }

  set status(status: AnimalStatus) {
    this.props.status = status;
    this._touch();
  }

  get photos() {
    return this.props.photos;
  }

  set photos(photos: AnimalPhotoList) {
    this.props.photos = photos;
    this._touch();
  }

  static validate(data: AnimalProps): void {
    const validator = AnimalValidatorFactory.create();
    const isValid = validator.validate(data);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  private _touch(): void {
    Animal.validate(this.props);
  }

  public adopt(): void {
    this.status = AnimalStatus.create('adopted');
  }

  public isAvailable(): boolean {
    return this.status.value === 'available';
  }

  public isUnavailable(): boolean {
    return this.status.value === 'adopted';
  }
}

import { Entity } from '@core/enterprise/entity';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { ReportValidatorFactory } from '../validators/report.validator';

interface ReportProps {
  reporterId: UniqueEntityId;
  accusedOwnerId: UniqueEntityId;
  animalId: UniqueEntityId;
  reason: string;
}

export class Report extends Entity<ReportProps> {
  static create(props: ReportProps, id?: UniqueEntityId): Report {
    Report.validate(props);
    return new Report(props, id);
  }

  get reporterId(): UniqueEntityId {
    return this.props.reporterId;
  }

  set reporterId(reporterId: UniqueEntityId) {
    this.props.reporterId = reporterId;
    this._touch();
  }

  get accusedOwnerId(): UniqueEntityId {
    return this.props.accusedOwnerId;
  }

  set accusedOwnerId(accusedOwnerId: UniqueEntityId) {
    this.props.accusedOwnerId = accusedOwnerId;
    this._touch();
  }

  get animalId(): UniqueEntityId {
    return this.props.animalId;
  }

  set animalId(animalId: UniqueEntityId) {
    this.props.animalId = animalId;
    this._touch();
  }

  get reason(): string {
    return this.props.reason;
  }

  set reason(reason: string) {
    this.props.reason = reason;
    this._touch();
  }

  static validate(data: ReportProps): void {
    const validator = ReportValidatorFactory.create();
    const isValid = validator.validate(data);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  private _touch(): void {
    Report.validate(this.props);
  }
}

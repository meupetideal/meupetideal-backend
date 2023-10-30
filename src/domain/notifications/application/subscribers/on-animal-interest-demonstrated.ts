import { EventHandler } from '@core/application/event-handler';
import { DomainEvents } from '@core/enterprise/domain-events';
import { InterestDemonstratedEvent } from '@domain/adoption/enterprise/events/interest-demonstrated.event';
import { AnimalsRepository } from '@domain/adoption/application/repositories/animals.repository';
import { inject, injectable } from 'tsyringe';
import { SendNotificationUseCase } from '../use-cases/send-notification.use-case';

@injectable()
export class OnAnimalInterestDemonstrated implements EventHandler {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: AnimalsRepository,
    @inject('SendNotificationUseCase')
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewInterestNotification.bind(this),
      InterestDemonstratedEvent.name,
    );
  }

  private async sendNewInterestNotification({
    interest,
  }: InterestDemonstratedEvent) {
    const animal = await this.animalsRepository.findById(
      interest.animalId.value,
    );

    if (animal) {
      await this.sendNotification.execute({
        recipientId: animal.ownerId.value,
        title: `Houve um interesse no ${animal.name}.`,
        redirectToUrl: `/adoption/interests/${interest.id.value}`,
      });
    }
  }
}

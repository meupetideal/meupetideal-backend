import { NotificationsRepository } from '@domain/notifications/application/repositories/notifications.repository';
import { inject, injectable } from 'tsyringe';
import { Notification } from '@domain/notifications/enterprise/entities/notification';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';

@injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(
    @inject('PrismaService')
    private prismaService: PrismaService,
  ) {}

  public async findById(id: string): Promise<Notification | undefined> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return undefined;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  public async insert(entity: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNotificationMapper.toPrisma(entity),
    });
  }

  public async save(entity: Notification): Promise<void> {
    await this.prismaService.notification.update({
      where: { id: entity.id.value },
      data: PrismaNotificationMapper.toPrisma(entity),
    });
  }
}

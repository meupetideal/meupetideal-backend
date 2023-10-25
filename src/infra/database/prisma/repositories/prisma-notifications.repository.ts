import { NotificationsRepository } from '@domain/notifications/application/repositories/notifications.repository';
import { inject, injectable } from 'tsyringe';
import { Notification } from '@domain/notifications/enterprise/entities/notification';
import {
  SearchInput,
  SearchMapper,
  SearchOutput,
} from '@core/application/pagination';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';

@injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(
    @inject('PrismaService')
    private prismaService: PrismaService,
  ) {}

  public async searchByRecipientId({
    page,
    perPage,
    recipientId,
  }: SearchInput & { recipientId: string }): Promise<
    SearchOutput<Notification>
  > {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const total = await this.prismaService.notification.count({
      where: { recipientId },
    });

    return SearchMapper.toOutput({
      items: notifications.map((notification) =>
        PrismaNotificationMapper.toDomain(notification),
      ),
      page,
      total,
    });
  }

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

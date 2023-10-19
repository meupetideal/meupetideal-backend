import { z } from 'zod';
import { Validator } from '@core/enterprise/validator';

const notificationSchema = z.object({
  title: z.string().min(3).max(255),
  redirectToUrl: z.string().min(3).max(255),
  sentAt: z.date(),
  readedAt: z.date().nullable(),
});

type NotificationSchema = z.infer<typeof notificationSchema>;

class NotificationValidator extends Validator<NotificationSchema> {
  protected schema = notificationSchema;
}

export class NotificationValidatorFactory {
  static create() {
    return new NotificationValidator();
  }
}

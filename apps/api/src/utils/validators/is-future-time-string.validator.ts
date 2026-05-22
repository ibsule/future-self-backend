import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as dayjs from 'dayjs';

export function IsFutureTimeString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFutureTimeString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const match = value.match(/^(\d+)([smhdwMy])$/);
          if (!match) return false;

          const amount = parseInt(match[1], 10);
          const unit = match[2];

          const unitMap: Record<string, dayjs.ManipulateType> = {
            s: 'second',
            m: 'minute',
            h: 'hour',
            d: 'day',
            w: 'week',
            M: 'month',
            y: 'year',
          };

          const now = dayjs();
          const future = now.add(amount, unitMap[unit]);

          // must be at least 1 minute ahead
          return future.diff(now, 'minute', true) >= 1;
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid time string (e.g. 1h, 2d, 1M) and at least 1 minute in the future`;
        },
      },
    });
  };
}

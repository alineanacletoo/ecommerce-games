import { isValid, parseISO, differenceInYears } from 'date-fns';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function ValidacaoIdade(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'validacaoIdade',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value || !isValid(parseISO(value))) return false;
          const age = differenceInYears(new Date(), parseISO(value));
          return age >= 18;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve indicar uma idade mínima de 18 anos.`;
        },
      },
    });
  };
}
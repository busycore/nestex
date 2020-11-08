/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

//This function were taken from here "https://www.devmedia.com.br/validar-cpf-com-javascript/23916"
//I made a little modification
function TestaCPF(strCPF: any) {
  strCPF = strCPF.toString();

  let Soma;
  let Resto;
  Soma = 0;
  if (strCPF == '00000000000') return false;
  if (strCPF.length < 11 || strCPF.length > 11) return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

@ValidatorConstraint({ async: true })
export class IsValidCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: any, args: ValidationArguments) {
    return TestaCPF(cpf);
  }
}

export function IsCPFValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidCPFConstraint,
    });
  };
}

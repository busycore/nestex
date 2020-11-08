import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { IsCPFValid } from '../validations/IsCPFValid';

export default class CreateUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Surname is required' })
  surname: string;

  @IsNotEmpty({ message: 'username is required' })
  @IsString({ message: 'Username should be a string' })
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  @MinLength(4, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too big' })
  //@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'Your password is not secure enough'})
  password: string;

  @IsNumber({}, { message: 'CPF SHOULD BE A NUMBER' })
  @IsNotEmpty({ message: 'CPF is required' })
  //This is our own CPF Validator
  @IsCPFValid({ message: 'CPF Must be valid' })
  cpf: number;

  @IsDateString({ message: 'a valid date is required' })
  @IsNotEmpty({ message: 'birth_date is required' })
  birth_date: Date;
}

import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(255)
  username: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}

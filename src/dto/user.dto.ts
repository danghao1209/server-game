import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { CustomPasswordValidator } from 'src/validator/password.validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Validate(CustomPasswordValidator)
  password: string;
}

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Validate(CustomPasswordValidator)
  password: string;

  @IsNotEmpty()
  @Validate(CustomPasswordValidator)
  repassword: string;

  @IsNotEmpty()
  name: string;
}

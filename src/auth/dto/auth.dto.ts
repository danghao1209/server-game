import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() username: string;

  @IsNotEmpty() name: string;

  @Length(6)
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() name: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() rePassword: string;
}

export class LoginUserDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string;
}

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customPassword', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    // Kiểm tra mật khẩu theo các yêu cầu của bạn
    // Yêu cầu: Mật khẩu phải có ít nhất 6 ký tự, chữ hoa, số và ký tự đặc biệt
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Mật khẩu phải có ít nhất 6 ký tự, chữ hoa, số và ký tự đặc biệt';
  }
}

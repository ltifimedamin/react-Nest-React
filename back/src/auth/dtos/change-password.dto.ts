import { IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  userId: string;

  @IsString()
  oldPassword: string;

  @MinLength(6)
  @IsString()
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
  newPassword: string;
}

import { IsString, Matches, MinLength } from "class-validator";

export class ResetPasswordDto{
    @IsString()
    resetToken: string;
    @MinLength(6)
    @IsString()
    @Matches(/^(?=.*[0-9])/,{message:'password mus contain at least one number'})
    newPassword: string;
}
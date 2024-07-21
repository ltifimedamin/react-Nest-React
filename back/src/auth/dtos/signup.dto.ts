import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignupDto{
    // @IsString()
    // name:string;
    @IsEmail()
    email:string;
    @MinLength(6)
    @IsString()
    @Matches(/^(?=.*[0-9])/,{message:'password mus contain at least one number'})
    password:string;
    @IsString()
    nom:string;
    @IsString()
    prenom:string;
    @IsString()
    role:string ;
    
    @Matches(/^[0-9]{8}$/, { message: 'The phone number must be exactly 8 digits long' })
    tel: number;

    @Type(() => Date)
    @IsDate()
    ddn: Date;
     
    @IsString()
    genre:string;
     
    @IsString()
    image:string;
     
    @IsString()
    address:string;
}
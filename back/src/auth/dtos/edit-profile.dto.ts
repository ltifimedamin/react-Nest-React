// edit-profile.dto.ts

import { IsEmail, IsString, Matches, MinLength, IsOptional } from 'class-validator';

export class EditProfileDto {
 

  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  prenom?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @Matches(/^[0-9]{8}$/, { message: 'The phone number must be exactly 8 digits long' })
  @IsOptional()
  tel?: number;

  // Assuming `ddn` is a Date type in your database
  @IsOptional()
  ddn?: Date;

  @IsString()
  @IsOptional()
  genre?: string;

  // Assuming `image` is the URL to the image on Cloudinary after upload
  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

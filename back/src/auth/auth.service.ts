import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose'; // Utilisation de InjectModel depuis @nestjs/mongoose
import { Model } from 'mongoose'; // Import de Model depuis mongoose
import * as bcrypt from 'bcrypt'
import { User } from './schemas/user.schemas';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from 'rxjs';
import { nanoid } from 'nanoid';
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import * as cloudinary from 'cloudinary';
import { Console } from 'console';
import { EditProfileDto } from './dtos/edit-profile.dto';


cloudinary.v2.config({
  cloud_name: 'dvm3eteit',
  api_key: '758969883748884',
  api_secret: '4_YBcL6QHzSBmxrYYWL-Yqm2hrk',
});
@Injectable()
export class AuthService {

    constructor(
                @InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
                @InjectModel(ResetToken.name) private resetTokenModel: Model<ResetToken>,
                 private jwtService:JwtService,
                 private mailService:MailService,
                ){}
   
  //   async signup(signupData: SignupDto) {
  //   const {  email, password, nom, prenom, role, tel, ddn, genre, image, address } = signupData;
  //   // const { name, email, password, nom, prenom, role, tel, ddn, genre, image, address } = signupData;

  //   // Vérifier si l'e-mail est déjà utilisé
  //   const emailInUse = await this.userModel.findOne({ email });
  //   if (emailInUse) {
  //     throw new BadRequestException('Email already in use');
  //   }

  //   // Hash du mot de passe
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   // Création et sauvegarde de l'utilisateur dans MongoDB
  //   await this.userModel.create({
  //   //   name,
  //     email,
  //     password: hashedPassword,
  //     nom,
  //     prenom,
  //     role,
  //     tel,
  //     ddn, // Assurez-vous que ddn est bien une date
  //     genre,
  //     image,
  //     address,
  //   });
  // }
  async signup(signupData: SignupDto) {
    const { email, password, nom, prenom, role, tel, ddn, genre, address } = signupData;
    
    // Vérifier si l'e-mail est déjà utilisé
    const emailInUse = await this.userModel.findOne({ email });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Upload de l'image vers Cloudinary
    let cloudinaryImage: string;
    try {
      const imageUpload = await cloudinary.v2.uploader.upload(signupData.image);
      cloudinaryImage = imageUpload.secure_url;
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Failed to upload image to Cloudinary');
    }
    
    // Création et sauvegarde de l'utilisateur dans MongoDB avec l'URL de l'image Cloudinary
    await this.userModel.create({
      email,
      password: hashedPassword,
      nom,
      prenom,
      role,
      tel,
      ddn, // Assurez-vous que ddn est bien une date
      genre,
      image: cloudinaryImage, // Utilisez l'URL de l'image Cloudinary ici
      address,
    });
  }
  async verifToken(userId: string): Promise<number> {
    const refreshToken = await this.refreshTokenModel.findOne({ userId }).exec();
    
    if (!refreshToken) {
      return 0; // Token not found or user has no token
    }

    const currentDate = new Date();
    const expiryDate = new Date(refreshToken.expiryDate);

    if (expiryDate < currentDate) {
      return 0; // Token has expired
    }

    return 1; // Token is still valid
  }
    async getUsers(){
        return await this.userModel.find();
    }

    async generateUserTokens(userId) {
        const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
        const refreshToken = uuidv4();
    
        await this.storeRefreshToken(refreshToken, userId);
        return {
            accessToken,
            refreshToken
        };
    }
    
    async login(credentials: LoginDto) {
        const { email, password } = credentials;
        // find if user exists by email
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Wrong Email : ');
        }
        // compare entered password with existing password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Wrong Password : ');
        }
        // generate JWT tokens (npm install --save @nestjs/jwt uuid)
        const tokens = await this.generateUserTokens(user._id); // Attendre la résolution de la promesse
        return {
            ...tokens,
            userId: user._id,
        };
    }

    async RefreshTokens(refreshToken:string){
       const token = await this.refreshTokenModel.findOne({
        token:refreshToken,
        expiryDate: {$gte:new Date()},
       });
       if(!token){
        throw new UnauthorizedException("refresh token is invalid")
       }
       return this.generateUserTokens(token.userId);
    }

   

    async storeRefreshToken(token: string, userId: string) {
        //calculate expiry date 3 days from now 
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);

        // Log the token and expiry date
        console.log('Storing refresh token:', { token, userId, expiryDate });

        await this.refreshTokenModel.updateOne(
            { userId },
            {$set:{expiryDate,token}},
            {upsert:true,},
        );
    }


    async changePassword(changePasswordDto: ChangePasswordDto) {
        const { userId, oldPassword, newPassword } = changePasswordDto;
      
        // find the user
        const user = await this.userModel.findById(userId);
        if (!user) {
          throw new NotFoundError('User not found');
        }
      
        // compare the old password with the password in DB
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
          throw new UnauthorizedException('Wrong Password');
        }
      
        // change user's password with HASH
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        await user.save();
      }
      
    async forgotPassword(email:string){ //(npm i nanoid@3.3.7)
        //check that user exist
        const user= await this.userModel.findOne({email});
        if(user){
            //if user exists,generatepassword reset link
            const expiryDate =new Date();
            expiryDate.setDate(expiryDate.getHours()+1);
            const resetToken=nanoid(64);
            await  this.resetTokenModel.create({
                token:resetToken,
                userId: user._id,
                expiryDate
            });
            // send the link to the user by email (using nodemailer/SES/etc ...)
            this.mailService.sendPasswordResetEmail(email,resetToken)
        }
        return{message:"If this user,existe,they will receive an email"};
    }

    async resetPassword(newPassword:string,resetToken:string){
        //find a valid reset token document
        const token = await this.resetTokenModel.findOneAndDelete({
            token:resetToken,
            expiryDate: {$gte:new Date()},
           });
           if(!token){
            throw new UnauthorizedException('Invalid link')
           }
        //change user password(HASH!!!)
        const user = await this.userModel.findById(token.userId);
        if(!user){
            throw new InternalServerErrorException();
        }
        user.password = await bcrypt.hash(newPassword,10);
        await user.save();
    }


    async getUserById(userId: string){
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }

    async editProfile(userId: string, editProfileData: EditProfileDto) {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      if (editProfileData.nom) {
        user.nom = editProfileData.nom;
      }
      if (editProfileData.prenom) {
        user.prenom = editProfileData.prenom;
      }
      if (editProfileData.role) {
        user.role = editProfileData.role;
      }
      if (editProfileData.tel) {
        user.tel = editProfileData.tel;
      }
      if (editProfileData.ddn) {
        user.ddn = editProfileData.ddn;
      }
      if (editProfileData.genre) {
        user.genre = editProfileData.genre;
      }
      if (editProfileData.address) {
        user.address = editProfileData.address;
      }
  
      if (editProfileData.image) {
        try {
          const imageUpload = await cloudinary.v2.uploader.upload(editProfileData.image);
          user.image = imageUpload.secure_url;
        } catch (error) {
          throw new BadRequestException('Failed to upload image to Cloudinary');
        }
      }
  
      await user.save();
    }



}
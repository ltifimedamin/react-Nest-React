import { Body, Controller, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshToken } from './schemas/refresh-token.schema';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { AuthService } from './auth.service';
import { EditProfileDto } from './dtos/edit-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('refresh')
  async refreshTokens(@Body() RefreshTokenDto: RefreshTokenDto) {
    return this.authService.RefreshTokens(RefreshTokenDto.refreshToken);
  }

  @Get('users')
  async getusers(){
    return this.authService.getUsers();
  }

  @Post('login')
  async login(@Body() credential: LoginDto) {
    return this.authService.login(credential);
  }

  @Get('verify-token/:userId')
  async verifyToken(@Param('userId') userId: string): Promise<number> {
    return this.authService.verifToken(userId);
  }

  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
  

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }
  
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto){
    return this.authService.resetPassword(resetPasswordDto.newPassword,resetPasswordDto.resetToken);
  }
  @Put('edit/:userId')
  async editProfile(@Param('userId') userId: string, @Body() editProfileDto: EditProfileDto) {
    await this.authService.editProfile(userId, editProfileDto);
    return { message: 'Profile updated successfully' };
  }
  @Get('getUserById/:userId')
  async getUserById(@Param('userId') userId: string) {
     
    return this.authService.getUserById(userId);
  }
}

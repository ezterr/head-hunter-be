import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../common/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  ResetPasswordResponse,
  LoginResponse,
  LogoutResponse,
  SetNewPasswordResponse,
  GetAuthUserResponse,
} from '../types';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SetNewPasswordDto } from './dto/set-new-password.dto';
import { UserHelperService } from '../user/user-helper.service';
import { UserService } from '../user/user.service';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserHelperService) private userHelperService: UserHelperService,
    @Inject(UserService) private userService: UserService,
  ) {}

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getAuthUser(@UserObj() user: User): Promise<GetAuthUserResponse> {
    return this.userService.findOne(user.id);
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  async login(
    @Res({ passthrough: true }) res: Response,
    @UserObj() user: User,
  ): Promise<LoginResponse> {
    return this.authService.login(user, res);
  }

  @Delete('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Res({ passthrough: true }) res: Response,
    @UserObj() user: User,
  ): Promise<LogoutResponse> {
    return this.authService.logout(user, res);
  }

  @Delete('/password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<ResetPasswordResponse> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Put('/password/:userToken')
  async setNewPassword(
    @Body() resetPasswordDto: SetNewPasswordDto,
    @Param('userToken') userToken: string,
  ): Promise<SetNewPasswordResponse> {
    return this.authService.setNewPassword(userToken, resetPasswordDto);
  }
}

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const res = await this.authService.login(data);
    return res;
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: any) {
    return await this.authService.logout({
      userId: req.user.id,
      sessionId: req.user.sessionId,
    });
  }

  @Post('logout-all-sessions')
  @UseGuards(AuthGuard)
  async logoutAllSessions(@Req() req: any) {
    return await this.authService.logoutAllSessions({
      userId: req.user.id,
    });
  }

  @Post('forget-password')
  async forgetPassword(@Body() data: ForgetPasswordDto) {
    const res = await this.authService.forgetPassword(data);
    return res;
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    const res = await this.authService.resetPassword(data);
    return res;
  }
}

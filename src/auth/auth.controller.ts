import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private usersService: UserService,){}
    
        @Post('login')
        @HttpCode(HttpStatus.OK)
        async login(@Body() body: { login: string; password: string }, @Res() res: Response) {
          const user = await this.authService.validateUser(body.login, body.password);
          if (!user) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
          }
          return res.status(200).json("Авторизация прошла успешно");
        }
}

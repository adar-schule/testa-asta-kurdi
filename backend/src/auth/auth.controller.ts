import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth') // Group all routes under "auth"
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Login user and generate JWT' })
    @ApiResponse({ status: 200, description: 'User authenticated successfully.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    @Post('login')
    async login(@Body() loginDto: { username: string, password: string }) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        return this.authService.login(user);
    }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ManagementService } from '../management/management.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private managementService: ManagementService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.managementService.findByUsername(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            // Instead of just removing the password, pass the whole user object.
            return {
                username: user.username,
                role: user.role,  // Ensure role is returned here
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        const payload = { username: user.username, role: user.role };
        console.log('JWT Payload:', payload);  // Log to see the payload
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
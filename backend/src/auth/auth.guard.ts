import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

        if (!token) {
            throw new UnauthorizedException('No token found');
        }

        try {
            const decoded = this.jwtService.verify(token); // Verify the token
            request.user = decoded; // Attach the decoded user info (with role) to the request object
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log(">>> User: ", user);
        // Check if the user's role is Admin
        if (user.role !== 'Admin') {
            throw new ForbiddenException('You do not have permission to perform this action');
        }

        return true; // If the user is an Admin, allow access
    }
}
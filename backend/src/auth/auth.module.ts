import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ManagementModule } from 'src/management/management.module'; // Import using forwardRef
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            // TODO: Set this to a secure value in production
            secret: 'yourSecretKey', // Ensure you set this securely in production
            signOptions: { expiresIn: '1h' },
        }),
        forwardRef(() => ManagementModule), // Use forwardRef() to avoid circular dependency
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtModule, AuthService], // Export JwtModule and AuthService to be used in other modules
})
export class AuthModule { }
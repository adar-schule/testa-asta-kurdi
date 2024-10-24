import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagementService } from './management.service';
import { Management, ManagementSchema } from './schemas/management.schema';
import { ManagementController } from './management.controller';
import { AuthModule } from 'src/auth/auth.module'; // Import using forwardRef

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Management.name, schema: ManagementSchema }]),
        forwardRef(() => AuthModule), // Use forwardRef() to avoid circular dependency
    ],
    controllers: [ManagementController],
    providers: [ManagementService],
    exports: [ManagementService],
})
export class ManagementModule { }
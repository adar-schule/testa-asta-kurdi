import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagementService } from './management.service';
import { Management, ManagementSchema } from './schemas/management.schema';
import { ManagementController } from './management.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Management.name, schema: ManagementSchema }]),
    ],
    controllers: [ManagementController],
    providers: [ManagementService],
    exports: [ManagementService],
})
export class ManagementModule { }
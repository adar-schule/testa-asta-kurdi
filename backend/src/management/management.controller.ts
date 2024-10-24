import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Management } from './schemas/management.schema';
import { CreateManagementDto } from './dto/create-management.dto';

@ApiTags('management')
@Controller('management')
export class ManagementController {
    constructor(private readonly managementService: ManagementService) { }

    @ApiOperation({ summary: 'Create a new management user (Admin or Auditor)' })
    @ApiResponse({ status: 201, description: 'The management user has been created.', type: Management })
    @Post('create')
    async create(@Body() createManagementDto: CreateManagementDto): Promise<Management> {
        const { username, password, role } = createManagementDto;
        return this.managementService.create(username, password, role);
    }

    @ApiOperation({ summary: 'Get management user by username' })
    @ApiParam({ name: 'username', description: 'The username of the management user' })
    @ApiResponse({ status: 200, description: 'Management user found.', type: Management })
    @Get(':username')
    async findOne(@Param('username') username: string): Promise<Management> {
        return this.managementService.findByUsername(username);
    }
}
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Management } from './schemas/management.schema';
import { CreateManagementDto } from './dto/create-management.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('management')
@Controller('management')
export class ManagementController {
    constructor(private readonly managementService: ManagementService) { }

    @ApiOperation({ summary: 'Create a new management user (Admin or Auditor)' })
    @ApiResponse({ status: 201, description: 'The management user has been created.', type: Management })
    @UseGuards(AuthGuard, RolesGuard)
    @Post('create')
    async create(@Body() createManagementDto: CreateManagementDto): Promise<Management> {
        const { username, password, role } = createManagementDto;
        return this.managementService.create(username, password, role);
    }

    @ApiOperation({ summary: 'Get all management users' })
    @ApiResponse({ status: 200, description: 'List of all management users.', type: [Management] })
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async findAll(): Promise<Management[]> {
        return this.managementService.findAll();
    }

    @ApiOperation({ summary: 'Get management user by username' })
    @ApiParam({ name: 'username', description: 'The username of the management user' })
    @ApiResponse({ status: 200, description: 'Management user found.', type: Management })
    @UseGuards(AuthGuard, RolesGuard)
    @Get('username/:username')
    async findOne(@Param('username') username: string): Promise<Management> {
        return this.managementService.findByUsername(username);
    }

    @ApiOperation({ summary: 'Get management user by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the management user' })
    @ApiResponse({ status: 200, description: 'Management user found.', type: Management })
    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Management> {
        return this.managementService.findById(id);
    }
}
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('项目管理')
@Controller('projects')
// @UseGuards(JwtAuthGuard) // 临时移除认证用于测试
// @ApiBearerAuth()
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prisma: PrismaService,
  ) {}

  private async getOrCreateTestUser() {
    // 尝试查找第一个用户，如果没有则创建一个测试用户
    let user = await this.prisma.user.findFirst();

    if (!user) {
      // 创建测试用户
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('test123', 10);

      user = await this.prisma.user.create({
        data: {
          email: 'test@test.com',
          username: 'testuser',
          password: hashedPassword,
        },
      });
    }

    return user.id;
  }

  @Get()
  @ApiOperation({ summary: '获取项目列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findAll(@Request() req) {
    // 临时使用数据库中的第一个用户进行测试
    const userId = await this.getOrCreateTestUser();
    return this.projectsService.findAll(userId);
  }

  @Post()
  @ApiOperation({ summary: '创建项目' })
  @ApiResponse({ status: 201, description: '创建成功' })
  async create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    // 临时使用数据库中的第一个用户进行测试
    const userId = await this.getOrCreateTestUser();
    return this.projectsService.create(userId, createProjectDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取项目详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新项目' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除项目' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

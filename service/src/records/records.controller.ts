import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RecordsService } from './records.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@ApiTags('学习记录')
@Controller()
// @UseGuards(JwtAuthGuard) // 临时移除认证用于测试
// @ApiBearerAuth()
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  // 嵌套路由：GET /projects/:projectId/records
  @Get('projects/:projectId/records')
  @ApiOperation({ summary: '获取项目学习记录' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findByProject(
    @Param('projectId') projectId: string,
    @Query('month') month?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.recordsService.findByProject(projectId, { month, page, limit });
  }

  // 嵌套路由：POST /projects/:projectId/records
  @Post('projects/:projectId/records')
  @ApiOperation({ summary: '创建学习记录' })
  @ApiResponse({ status: 201, description: '创建成功' })
  async create(
    @Param('projectId') projectId: string,
    @Body() createRecordDto: CreateRecordDto,
    @Request() req,
  ) {
    // 临时使用固定用户ID进行测试
    const userId = 'test-user-id';
    return this.recordsService.create(projectId, userId, createRecordDto);
  }

  // 独立路由：GET /records/:id
  @Get('records/:id')
  @ApiOperation({ summary: '获取记录详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findOne(@Param('id') id: string) {
    return this.recordsService.findOne(id);
  }

  // 独立路由：PUT /records/:id
  @Put('records/:id')
  @ApiOperation({ summary: '更新学习记录' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
  ) {
    return this.recordsService.update(id, updateRecordDto);
  }

  // 独立路由：DELETE /records/:id
  @Delete('records/:id')
  @ApiOperation({ summary: '删除学习记录' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id') id: string) {
    return this.recordsService.remove(id);
  }
}

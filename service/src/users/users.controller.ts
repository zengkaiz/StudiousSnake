import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('用户')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.id)
  }

  @Put('profile')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto)
  }

  @Get('stats')
  @ApiOperation({ summary: '获取用户统计' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getStats(@Request() req) {
    return this.usersService.getStats(req.user.id)
  }
}

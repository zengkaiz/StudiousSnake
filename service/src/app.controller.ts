import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('应用')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: '健康检查' })
  getHello(): string {
    return '贪学蛇 API 服务运行正常 🐍'
  }

  @Get('health')
  @ApiOperation({ summary: '服务状态' })
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'studysnake-api',
      version: '1.0.0'
    }
  }
}

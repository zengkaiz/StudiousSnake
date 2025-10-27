import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return '贪学蛇 API 服务运行正常 🐍'
  }
}

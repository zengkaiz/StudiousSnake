import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ description: '邮箱', example: 'user@example.com' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString()
  @MinLength(6, { message: '密码至少6位' })
  password: string
}

import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty({ description: '邮箱', example: 'user@example.com' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string

  @ApiProperty({ description: '密码', example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6, { message: '密码至少6位' })
  password: string

  @ApiProperty({ description: '用户名', example: 'username' })
  @IsString()
  @MinLength(2, { message: '用户名至少2位' })
  username: string

  @ApiProperty({ description: '头像', example: 'https://example.com/avatar.jpg', required: false })
  @IsOptional()
  @IsString()
  avatar?: string
}

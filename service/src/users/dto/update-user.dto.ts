import { IsString, IsOptional, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiProperty({ description: '用户名', example: 'new_username', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: '用户名至少2位' })
  username?: string

  @ApiProperty({ description: '头像', example: 'https://example.com/avatar.jpg', required: false })
  @IsOptional()
  @IsString()
  avatar?: string
}

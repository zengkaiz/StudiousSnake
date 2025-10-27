import { IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({
    description: '项目名称',
    example: '英语学习进阶',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '项目名称不能为空' })
  name?: string;

  @ApiProperty({
    description: '项目描述',
    example: '高级词汇 · 语法练习',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '项目图标', example: '📚', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: '项目颜色', example: '#3b82f6', required: false })
  @IsOptional()
  @IsString()
  color?: string;
}

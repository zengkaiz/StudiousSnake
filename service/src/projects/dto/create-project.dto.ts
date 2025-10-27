import { IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: '项目名称', example: '英语学习' })
  @IsString()
  @MinLength(1, { message: '项目名称不能为空' })
  name: string;

  @ApiProperty({ description: '项目描述', example: '每日单词 · 短语积累' })
  @IsString()
  description: string;

  @ApiProperty({ description: '项目图标', example: '📖' })
  @IsString()
  icon: string;
}

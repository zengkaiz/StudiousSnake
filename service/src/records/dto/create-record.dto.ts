import { IsString, IsNumber, IsArray, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordDto {
  @ApiProperty({ description: '学习日期', example: '2025-10-23' })
  @IsString()
  date: string;

  @ApiProperty({ description: '学习时长（小时）', example: 2 })
  @IsNumber()
  @Min(0, { message: '学习时长不能为负数' })
  duration: number;

  @ApiProperty({
    description: '学习内容（Markdown格式）',
    example: '## 📖 今日单词\n\n**eloquent** /ˈeləkwənt/ adj. 雄辩的',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: '标签（逗号分隔）',
    example: '单词,短语',
    required: false,
  })
  @IsOptional()
  @IsString()
  tags?: string;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  async create(
    projectId: string,
    userId: string,
    createRecordDto: CreateRecordDto,
  ) {
    return this.prisma.record.create({
      data: {
        projectId,
        userId,
        date: createRecordDto.date,
        duration: createRecordDto.duration,
        content: createRecordDto.content,
        tags: createRecordDto.tags,
      },
    });
  }

  async findByProject(projectId: string, options: any = {}) {
    const { month, page = 1, limit = 20 } = options;

    const where: any = { projectId };

    if (month) {
      const [year, monthNum] = month.split('-');
      const startDate = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(monthNum), 0);
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const [records, total] = await Promise.all([
      this.prisma.record.findMany({
        where,
        orderBy: { date: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.record.count({ where }),
    ]);

    return {
      records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const record = await this.prisma.record.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException('记录不存在');
    }
    return record;
  }

  async update(id: string, updateRecordDto: UpdateRecordDto) {
    return this.prisma.record.update({
      where: { id },
      data: {
        date: updateRecordDto.date,
        duration: updateRecordDto.duration,
        content: updateRecordDto.content,
        tags: updateRecordDto.tags,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.record.delete({
      where: { id },
    });
    return { message: '记录删除成功' };
  }
}

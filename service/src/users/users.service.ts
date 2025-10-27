import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: any) {
    return this.prisma.user.create({
      data: userData,
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async getStats(userId: string) {
    const [totalProjects, totalRecords, records] = await Promise.all([
      this.prisma.project.count({ where: { userId } }),
      this.prisma.record.count({ where: { userId } }),
      this.prisma.record.findMany({
        where: { userId },
        select: { duration: true, date: true },
      }),
    ]);

    const totalDuration = records.reduce((sum, r) => sum + r.duration, 0);
    const uniqueDays = new Set(records.map((r) => r.date.toDateString())).size;
    const averageDailyDuration =
      uniqueDays > 0 ? totalDuration / uniqueDays : 0;

    return {
      totalProjects,
      totalRecords,
      totalDuration,
      totalDays: uniqueDays,
      averageDailyDuration: Math.round(averageDailyDuration * 100) / 100,
    };
  }
}

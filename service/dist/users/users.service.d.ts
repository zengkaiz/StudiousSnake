import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userData: any): Promise<{
        username: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: string): Promise<{
        username: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        username: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        username: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getStats(userId: string): Promise<{
        totalProjects: number;
        totalRecords: number;
        totalDuration: number;
        totalDays: number;
        averageDailyDuration: number;
    }>;
}

import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
export declare class RecordsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(projectId: string, userId: string, createRecordDto: CreateRecordDto): Promise<{
        tags: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        userId: string;
        date: Date;
        duration: number;
        content: string;
    }>;
    findByProject(projectId: string, options?: any): Promise<{
        records: {
            tags: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            projectId: string;
            userId: string;
            date: Date;
            duration: number;
            content: string;
        }[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        tags: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        userId: string;
        date: Date;
        duration: number;
        content: string;
    }>;
    update(id: string, updateRecordDto: UpdateRecordDto): Promise<{
        tags: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        userId: string;
        date: Date;
        duration: number;
        content: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

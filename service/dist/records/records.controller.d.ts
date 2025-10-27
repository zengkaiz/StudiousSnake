import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
export declare class RecordsController {
    private readonly recordsService;
    constructor(recordsService: RecordsService);
    findByProject(projectId: string, month?: string, page?: number, limit?: number): Promise<{
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
    create(projectId: string, createRecordDto: CreateRecordDto, req: any): Promise<{
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

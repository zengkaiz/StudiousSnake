import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createProjectDto: CreateProjectDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        coverImage: string | null;
    }>;
    findAll(userId: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        coverImage: string | null;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        coverImage: string | null;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        icon: string;
        coverImage: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

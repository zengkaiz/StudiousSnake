import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProjectsController {
    private readonly projectsService;
    private readonly prisma;
    constructor(projectsService: ProjectsService, prisma: PrismaService);
    private getOrCreateTestUser;
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        icon: string;
        description: string | null;
        coverImage: string | null;
        userId: string;
    }[]>;
    create(req: any, createProjectDto: CreateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        icon: string;
        description: string | null;
        coverImage: string | null;
        userId: string;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        icon: string;
        description: string | null;
        coverImage: string | null;
        userId: string;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        icon: string;
        description: string | null;
        coverImage: string | null;
        userId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

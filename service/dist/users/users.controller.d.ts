import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        username: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        username: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getStats(req: any): Promise<{
        totalProjects: number;
        totalRecords: number;
        totalDuration: number;
        totalDays: number;
        averageDailyDuration: number;
    }>;
}

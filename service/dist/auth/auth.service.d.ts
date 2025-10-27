import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        data: {
            user: {
                id: string;
                email: string;
                username: string;
                createdAt: Date;
            };
            tokens: {
                accessToken: string;
                refreshToken: string;
            };
        };
    }>;
    login(user: any): Promise<{
        success: boolean;
        data: {
            user: {
                id: any;
                email: any;
                username: any;
            };
            tokens: {
                accessToken: string;
                refreshToken: string;
            };
        };
    }>;
    refresh(refreshToken: string): Promise<{
        success: boolean;
        data: {
            tokens: {
                accessToken: string;
                refreshToken: string;
            };
        };
    }>;
    validateUser(email: string, password: string): Promise<any>;
    private generateTokens;
}

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    login(loginDto: LoginDto, req: any): Promise<{
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
    logout(): Promise<{
        message: string;
    }>;
}

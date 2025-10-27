"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { email, password, username } = registerDto;
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('用户已存在');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({
            email,
            password: hashedPassword,
            username,
        });
        const tokens = await this.generateTokens(user);
        return {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    createdAt: user.createdAt,
                },
                tokens,
            },
        };
    }
    async login(user) {
        const tokens = await this.generateTokens(user);
        return {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
                tokens,
            },
        };
    }
    async refresh(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.usersService.findById(payload.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('用户不存在');
            }
            const tokens = await this.generateTokens(user);
            return {
                success: true,
                data: { tokens },
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token无效');
        }
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async generateTokens(user) {
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
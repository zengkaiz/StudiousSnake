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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userData) {
        return this.prisma.user.create({
            data: userData,
        });
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('用户不存在');
        }
        return user;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async update(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
    async getStats(userId) {
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
        const averageDailyDuration = uniqueDays > 0 ? totalDuration / uniqueDays : 0;
        return {
            totalProjects,
            totalRecords,
            totalDuration,
            totalDays: uniqueDays,
            averageDailyDuration: Math.round(averageDailyDuration * 100) / 100,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
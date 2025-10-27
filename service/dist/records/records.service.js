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
exports.RecordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecordsService = class RecordsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(projectId, userId, createRecordDto) {
        return this.prisma.record.create({
            data: {
                projectId,
                userId,
                date: createRecordDto.date,
                duration: createRecordDto.duration,
                content: createRecordDto.content,
                tags: createRecordDto.tags,
            },
        });
    }
    async findByProject(projectId, options = {}) {
        const { month, page = 1, limit = 20 } = options;
        const where = { projectId };
        if (month) {
            const [year, monthNum] = month.split('-');
            const startDate = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
            const endDate = new Date(parseInt(year), parseInt(monthNum), 0);
            where.date = {
                gte: startDate,
                lte: endDate,
            };
        }
        const [records, total] = await Promise.all([
            this.prisma.record.findMany({
                where,
                orderBy: { date: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.record.count({ where }),
        ]);
        return {
            records,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const record = await this.prisma.record.findUnique({
            where: { id },
        });
        if (!record) {
            throw new common_1.NotFoundException('记录不存在');
        }
        return record;
    }
    async update(id, updateRecordDto) {
        return this.prisma.record.update({
            where: { id },
            data: {
                date: updateRecordDto.date,
                duration: updateRecordDto.duration,
                content: updateRecordDto.content,
                tags: updateRecordDto.tags,
            },
        });
    }
    async remove(id) {
        await this.prisma.record.delete({
            where: { id },
        });
        return { message: '记录删除成功' };
    }
};
exports.RecordsService = RecordsService;
exports.RecordsService = RecordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecordsService);
//# sourceMappingURL=records.service.js.map
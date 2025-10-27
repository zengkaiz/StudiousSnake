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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const records_service_1 = require("./records.service");
const create_record_dto_1 = require("./dto/create-record.dto");
const update_record_dto_1 = require("./dto/update-record.dto");
let RecordsController = class RecordsController {
    constructor(recordsService) {
        this.recordsService = recordsService;
    }
    async findByProject(projectId, month, page, limit) {
        return this.recordsService.findByProject(projectId, { month, page, limit });
    }
    async create(projectId, createRecordDto, req) {
        const userId = 'test-user-id';
        return this.recordsService.create(projectId, userId, createRecordDto);
    }
    async findOne(id) {
        return this.recordsService.findOne(id);
    }
    async update(id, updateRecordDto) {
        return this.recordsService.update(id, updateRecordDto);
    }
    async remove(id) {
        return this.recordsService.remove(id);
    }
};
exports.RecordsController = RecordsController;
__decorate([
    (0, common_1.Get)('projects/:projectId/records'),
    (0, swagger_1.ApiOperation)({ summary: '获取项目学习记录' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '获取成功' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "findByProject", null);
__decorate([
    (0, common_1.Post)('projects/:projectId/records'),
    (0, swagger_1.ApiOperation)({ summary: '创建学习记录' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '创建成功' }),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_record_dto_1.CreateRecordDto, Object]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('records/:id'),
    (0, swagger_1.ApiOperation)({ summary: '获取记录详情' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '获取成功' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('records/:id'),
    (0, swagger_1.ApiOperation)({ summary: '更新学习记录' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '更新成功' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_record_dto_1.UpdateRecordDto]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('records/:id'),
    (0, swagger_1.ApiOperation)({ summary: '删除学习记录' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '删除成功' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "remove", null);
exports.RecordsController = RecordsController = __decorate([
    (0, swagger_1.ApiTags)('学习记录'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [records_service_1.RecordsService])
], RecordsController);
//# sourceMappingURL=records.controller.js.map
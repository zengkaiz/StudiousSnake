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
exports.CreateRecordDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateRecordDto {
}
exports.CreateRecordDto = CreateRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '学习日期', example: '2025-10-23' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '学习时长（小时）', example: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: '学习时长不能为负数' }),
    __metadata("design:type", Number)
], CreateRecordDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '学习内容（Markdown格式）',
        example: '## 📖 今日单词\n\n**eloquent** /ˈeləkwənt/ adj. 雄辩的',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '标签（逗号分隔）',
        example: '单词,短语',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "tags", void 0);
//# sourceMappingURL=create-record.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('贪学蛇 API')
        .setDescription('学习记录本后端API文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 贪学蛇API服务已启动: http://localhost:${port}`);
    console.log(`📚 API文档: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map
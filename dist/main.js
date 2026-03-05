"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiDocument = exports.app = void 0;
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(nestApp, config);
    swagger_1.SwaggerModule.setup('docs', nestApp, document);
    nestApp.getHttpAdapter().get('/openapi.json', (_req, res) => {
        res.json(document);
    });
    exports.app = nestApp;
    exports.openApiDocument = document;
    await nestApp.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
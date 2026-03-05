const { writeFileSync } = require('fs');
const { app } = require('../dist/main');
const { SwaggerModule } = require('@nestjs/swagger');

async function exportSpec() {
  const document = SwaggerModule.createDocument(app, {});
  writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
  process.exit(0);
}

exportSpec();

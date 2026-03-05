const { writeFileSync } = require('fs');
const { openApiDocument } = require('../dist/main');

async function exportSpec() {
  if (!openApiDocument) {
    throw new Error('OpenAPI document is not initialized');
  }
  writeFileSync('./openapi.json', JSON.stringify(openApiDocument, null, 2));
  process.exit(0);
}

exportSpec();

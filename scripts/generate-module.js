#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();
}

function toPascalCase(value) {
  return value
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^./, (char) => char.toUpperCase());
}

function toEntityName(value) {
  return value.replace(/Entity$/i, "");
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFileIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log(`Skipped existing file: ${path.relative(process.cwd(), filePath)}`);
    return;
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created: ${path.relative(process.cwd(), filePath)}`);
}

const moduleArg = process.argv[2];

if (!moduleArg) {
  console.error("Usage: pnpm run generate:module -- <module-name>");
  console.error("Example: pnpm run generate:module -- user-profile");
  process.exit(1);
}

const moduleName = moduleArg.trim();
const kebabName = toKebabCase(moduleName);
const pascalName = toPascalCase(moduleName);
const entityName = toEntityName(pascalName);
const camelName = toCamelCase(kebabName);
const baseDir = path.join(process.cwd(), "src", "modules", kebabName);

const directories = [
  path.join(baseDir, "application", "dto"),
  path.join(baseDir, "application", "services"),
  path.join(baseDir, "data", "datasources"),
  path.join(baseDir, "data", "repositories"),
  path.join(baseDir, "domain", "entities"),
  path.join(baseDir, "domain", "repositories"),
  path.join(baseDir, "presentation", "controllers"),
  path.join(baseDir, "presentation", "routes"),
];

for (const dir of directories) {
  ensureDir(dir);
}

const templates = {
  [`application/dto/${kebabName}.response.dto.ts`]: `export interface ${pascalName}ResponseDto {}\n`,
  [`application/services/${kebabName}.service.ts`]: `import type { ${pascalName}Repository } from "../../domain/repositories/${kebabName}.repository";\n\nexport class ${pascalName}Service {\n  constructor(private readonly ${camelName}Repository: ${pascalName}Repository) {}\n}\n`,
  [`data/datasources/${kebabName}.datasource.ts`]: `export interface ${pascalName}DataSource {}\n`,
  [`data/datasources/${kebabName}.datasource.impl.ts`]: `import type { ${pascalName}DataSource } from "./${kebabName}.datasource";\n\nexport class ${pascalName}DataSourceImpl implements ${pascalName}DataSource {}\n`,
  [`data/repositories/${kebabName}.repository.impl.ts`]: `import type { ${pascalName}DataSource } from "../datasources/${kebabName}.datasource";\nimport type { ${pascalName}Repository } from "../../domain/repositories/${kebabName}.repository";\n\nexport class ${pascalName}RepositoryImpl implements ${pascalName}Repository {\n  constructor(private readonly ${camelName}DataSource: ${pascalName}DataSource) {}\n}\n`,
  [`domain/entities/${kebabName}.ts`]: `export interface ${entityName} {}\n`,
  [`domain/repositories/${kebabName}.repository.ts`]: `export interface ${pascalName}Repository {}\n`,
  [`presentation/controllers/${kebabName}.controller.ts`]: `import type { ${pascalName}Service } from "../../application/services/${kebabName}.service";\n\nexport class ${pascalName}Controller {\n  constructor(private readonly ${camelName}Service: ${pascalName}Service) {}\n}\n`,
  [`presentation/routes/${kebabName}.routes.ts`]: `import { Router } from "express";\nimport { ${pascalName}Controller } from "../controllers/${kebabName}.controller";\nimport { ${pascalName}Service } from "../../application/services/${kebabName}.service";\nimport { ${pascalName}RepositoryImpl } from "../../data/repositories/${kebabName}.repository.impl";\nimport type { ${pascalName}Repository } from "../../domain/repositories/${kebabName}.repository";\nimport { ${pascalName}DataSourceImpl } from "../../data/datasources/${kebabName}.datasource.impl";\nimport type { ${pascalName}DataSource } from "../../data/datasources/${kebabName}.datasource";\n\nconst router = Router();\n\nconst ${camelName}DataSource: ${pascalName}DataSource = new ${pascalName}DataSourceImpl();\nconst ${camelName}Repository: ${pascalName}Repository = new ${pascalName}RepositoryImpl(${camelName}DataSource);\nconst ${camelName}Service = new ${pascalName}Service(${camelName}Repository);\nconst ${camelName}Controller = new ${pascalName}Controller(${camelName}Service);\n\nexport default router;\n`,
};

for (const [relativePath, content] of Object.entries(templates)) {
  writeFileIfMissing(path.join(baseDir, relativePath), content);
}

console.log(`\nModule scaffold created at src/modules/${kebabName}`);

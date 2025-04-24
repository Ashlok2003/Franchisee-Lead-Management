import path from 'path';
import swaggerUI from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupSwagger = (app) => {
    const swaggerFile =
        process.env.NODE_ENV === 'production' ? 'swagger.yaml' : 'swagger.local.yaml';

    const swaggerDocument = YAML.load(path.join(__dirname, `../../docs/${swaggerFile}`));

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};

export default setupSwagger;

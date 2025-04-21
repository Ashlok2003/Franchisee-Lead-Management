import path from 'path';
import swaggerUI from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupSwagger = (app) => {
    const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/swagger.yaml'));
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};

export default setupSwagger;

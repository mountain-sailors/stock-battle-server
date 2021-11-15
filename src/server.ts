import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import app from './app';
import logger from './config/logger';
import sequelize from './models';

// db connection
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db connect success!');
  })
  .catch((err: Error) => {
    console.error(err);
  });

// swagger
const swaggerYaml = YAML.load(path.join(__dirname, '../../swagger/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml));

app.listen(app.get('port'), () => {
  logger.info(`${app.get('port')} 번 포트에서 실행중`);
});

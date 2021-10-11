import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import sequelize from './models';
import router from './routes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('Hello Express'));

app.use('/api', router);

const swaggerYaml = YAML.load(path.join(__dirname, '../../swagger/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml));

// db connection
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('db connect success!');
  })
  .catch((err: Error) => {
    console.error(err);
  });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 실행중');
});

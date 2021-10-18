import express from 'express';
import passport from 'passport';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import passportConfig from './auth/passport';
import stockScheduler from './jobs/stockScheduler';
import sequelize from './models';
import router from './routes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('Hello Express'));

// swagger
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

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// passport
app.use(passport.initialize());
passportConfig();

app.use('/api', router);

stockScheduler();

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 실행중');
});

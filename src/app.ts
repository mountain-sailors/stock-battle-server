import express from 'express';
import sequelize from './models';
import router from './routes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('Hello Express'));

app.use('/api', router);

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

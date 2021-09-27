import express from 'express';
import router from './routes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('Hello Express'));

app.use('/api', router);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 실행중');
});

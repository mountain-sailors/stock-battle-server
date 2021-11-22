import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import passportConfig from './auth/passport';
import { myStream } from './config/logger';
import initScheduler from './jobs';
import router from './routes';
import fs from 'fs';
import https from 'https';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('Hello Express'));

app.use(cors());
app.use(express.static('public'));
const options = {
  ca: fs.readFileSync('/etc/letsencrypt/live/stock-battle.p-e.kr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/stock-battle.p-e.kr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/stock-battle.p-e.kr/cert.pem')
};
//https.createServer(app).listen(3000);
https.createServer(options, app).listen(443);

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// passport
app.use(passport.initialize());
passportConfig();

// morgan
app.use(morgan('combined', { stream: myStream }));

app.use('/api', router);

// scheduler
initScheduler();

export default app;

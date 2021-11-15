import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import passportConfig from './auth/passport';
import { myStream } from './config/logger';
import router from './routes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('Hello Express'));

app.use(cors());

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
// initScheduler();

export default app;

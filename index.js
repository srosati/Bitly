import express from 'express';
import authRouter from './auth/index.js';
import usersRouter from './users/index.js';
import tagsRouter from './tags/index.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/tags', tagsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log('App listening on port', PORT));

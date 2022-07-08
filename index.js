import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json' assert { type: 'json' };

import authRouter from './auth/index.js';
import usersRouter from './users/index.js';
import tagsRouter from './tags/index.js';
import urlsRouter from './urls/index.js';

import { redirectUrlService }from './urls/service.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/tags', tagsRouter);
app.use('/urls', urlsRouter);
app.use('/auth', authRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/:alias', redirectUrlService);

app.listen(PORT, () => console.log('App listening on port', PORT));

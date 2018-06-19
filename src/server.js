import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import Customer from './modules/customer';

const app = express();

app.set('port', process.env.PORT || 4200);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', Customer);

const server = app.listen(app.get('port'), (err) => {
  if (err) {
    console.error('Error in starting server\n', err);
  }

  console.log(`Server is listening in http://localhost:${app.get('port')}`);
});

export default server;

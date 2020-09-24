'use strict';

import mongoose from 'mongoose';

import logger from 'Core/Logger';

function connectMongoDB() {
  const MONGO_URL: string = process.env.MONGO_URL || '';
  mongoose.connect(
    MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(
      () => logger.info('Database is Connected!'),
      () => logger.info('Can\'t connect to the Database')
    );
}

export default connectMongoDB;
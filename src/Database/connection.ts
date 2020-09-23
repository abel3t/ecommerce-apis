'use strict';

import mongoose from 'mongoose';

function connectMongoDB() {
  const MONGO_URL: string = process.env.MONGO_URL || '';
  console.log(MONGO_URL);
  mongoose.connect(
    MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(
      () => console.log('Database is Connected!'),
      () => console.log('Can\'t connect to the Database')
    );
}

export default connectMongoDB;
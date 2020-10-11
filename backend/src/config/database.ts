import mongoose from 'mongoose';

class Database {
  public connect() {
    const auth = `${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}`;
    const url = `mongodb://${auth}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DB}`;

    console.log('Establish new connection with url', url);

    mongoose.Promise = global.Promise;
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(url);
  }
}

export default new Database();

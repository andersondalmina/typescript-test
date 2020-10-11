import mongoose, { Schema } from 'mongoose';
import User from '../../../entities/User';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.loadClass(User);

export default mongoose.model('User', UserSchema);

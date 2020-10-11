import mongoose, { Schema, Document } from 'mongoose';

export interface Transaction extends Document {
  type: String;
  description: String;
  value: Number;
  date: Date;
}

const TransactionSchema: Schema = new Schema({
  type: { type: String, required: true },
  description: { type: String },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<Transaction>('Transaction', TransactionSchema);

// class User {
//   private name: string;
//   private email: string;
//   private password: string;
// }

// export default User;

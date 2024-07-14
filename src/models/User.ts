import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
}

const UserSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  console.log('About to save a note:', this);
  next();
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

UserSchema.post('save', function(doc) {
  console.log('Saved note:', doc);
});

export default User;

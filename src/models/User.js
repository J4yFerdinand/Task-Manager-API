import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";  //* AutoIncrement plugin

const AutoIncrement = mongooseSequence(mongoose);

const userSchema = new mongoose.Schema(
  {   
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    tasks: [
      {
        type: Number,
        ref: "Task"
      }
    ]
  },
  {
    timestamps: true
  }
);

//* Apply AutoIncrement plugin to _id field
userSchema.plugin(AutoIncrement, { inc_field: "id" });

const User = mongoose.model("User", userSchema);

export default User;
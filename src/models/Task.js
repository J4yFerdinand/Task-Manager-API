import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "low"
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
      default: "pending"
    },
    user: {
      type: Number,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

taskSchema.plugin(AutoIncrement, { inc_field: "taskId" });

const Task = mongoose.model("Task", taskSchema);

export default Task;
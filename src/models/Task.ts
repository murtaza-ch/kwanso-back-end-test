import mongoose, { Document, Schema } from "mongoose";

export interface ITask {
  name: string;
}

export interface ITaskModel extends ITask, Document {}

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITaskModel>("Task", TaskSchema);

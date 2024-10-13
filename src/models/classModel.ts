import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator"; 

interface IClassroom extends Document {
    name: string;
    teacher?: mongoose.Types.ObjectId; 
    students?: mongoose.Types.ObjectId[]; 
  }
  
  const classroomSchema = new Schema<IClassroom>({
    name: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  });
  
  export const Classroom = mongoose.model<IClassroom>('Classroom', classroomSchema);
import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator"; 

interface IGrade {
  score: number;
  comment: string;
}

interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  classroom: mongoose.Types.ObjectId; 
  grades: IGrade[];
  roll: string;
}

const gradeSchema = new Schema<IGrade>({
  score: { type: Number, required: true },
  comment: { type: String, required: true },
});

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: (value: string) => validator.isEmail(value), 
      message: "Invalid email format", 
    },
  },
  password: { type: String, required: true,  match: [/^[0-9]{9}$/, "password must be 9 digits"]
  },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
  grades: [gradeSchema],
  roll: { type: String, required: true, enum: ["student"] }, 
});

export const Student = mongoose.model<IStudent>('Student', studentSchema);

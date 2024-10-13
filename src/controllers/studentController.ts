import { Request, Response } from "express";
import { Teacher } from "../models/teacherModel";
import { Student } from "../models/studentModel";
import { Classroom } from "../models/classModel";
import { Types } from "mongoose";

export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, className } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent?.email === email) {
      res.status(400).json({ error: "Student is already registered" });
      return;
    }
    const classroom = await Classroom.findOne({ name: className });
    if (!classroom) {
      res.status(404).json({ error: "Classroom not found" });
      return;
    }
    const newStudent = new Student({
      name,
      email,
      password,
      classroom: classroom._id,
      roll: "student",
    });
    await newStudent.save();
    classroom.students?.push(newStudent._id as Types.ObjectId);
    await classroom.save();

    res.status(201).json({ message: "Student registered successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error|| "An error occurred" });
  }
};

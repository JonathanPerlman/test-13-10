import { Request, Response } from "express";
import { Teacher } from "../models/teacherModel";
import { Classroom } from "../models/classModel";
import { Types } from "mongoose";
import { Student } from "../models/studentModel";

export const registerTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, className } = req.body;
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher?.email === email) {
      res.status(400).json({ error: "Teacher already has a classroom assigned" });
      return;
    }
    const existingClassroom = await Classroom.findOne({ name: className });
    if (existingClassroom) {
      res.status(400).json({ error: "Classroom with this name already exists" });
      return;
    }
    const newClass = new Classroom({ name: className });
    await newClass.save(); 
    const newTeacher = new Teacher({
      name,
      email,
      password,
      classroom: newClass._id,
      roll: "teacher",
    });
    await newTeacher.save(); 
    newClass.teacher = newTeacher._id as Types.ObjectId;
    await newClass.save();

    res.status(201).json({ classId: newClass._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

export const addGrade = async (req: Request, res: Response): Promise<void> => {
  const { studentId, comment, score } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    student.grades.push({ comment, score });  
    await student.save();
    res.status(200).json({ message: "Grade added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}


import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../utils/db.js";
import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const recruiterEmail = "demo.recruiter@circlo.dev";
const applicantEmail = "demo.candidate@circlo.dev";

const companies = [
  { name: "Nimble Labs", location: "Bengaluru, India", website: "https://example.com/nimble", description: "A product studio building thoughtful tools for modern teams." },
  { name: "Orbit Finance", location: "Mumbai, India", website: "https://example.com/orbit", description: "Making personal finance feel clear, calm and accessible." },
  { name: "Kindred Health", location: "Remote, India", website: "https://example.com/kindred", description: "Digital care experiences that put people first." },
];

const jobs = [
  { company: "Nimble Labs", title: "Frontend Engineer", description: "Build fast, accessible product experiences with React, TypeScript and a strong eye for interaction details.", requirements: ["React", "TypeScript", "Tailwind CSS"], salary: 18, experienceLevel: 2, location: "Bengaluru, India", jobType: "Full-time", position: 2 },
  { company: "Nimble Labs", title: "Product Designer", description: "Shape user journeys from early concepts through polished, production-ready interfaces for a growing B2B platform.", requirements: ["Figma", "Design systems", "User research"], salary: 16, experienceLevel: 3, location: "Remote, India", jobType: "Full-time", position: 1 },
  { company: "Orbit Finance", title: "Backend Engineer", description: "Design reliable APIs and services that help customers understand and manage their money with confidence.", requirements: ["Node.js", "MongoDB", "REST APIs"], salary: 20, experienceLevel: 3, location: "Mumbai, India", jobType: "Full-time", position: 2 },
  { company: "Orbit Finance", title: "Data Analyst", description: "Turn product and customer data into clear insights that guide the next generation of financial tools.", requirements: ["SQL", "Python", "Tableau"], salary: 14, experienceLevel: 1, location: "Hybrid, Mumbai", jobType: "Full-time", position: 1 },
  { company: "Kindred Health", title: "Full Stack Developer", description: "Work across the stack to bring trustworthy healthcare workflows to patients and care teams.", requirements: ["React", "Express", "MongoDB"], salary: 19, experienceLevel: 2, location: "Remote, India", jobType: "Full-time", position: 2 },
  { company: "Kindred Health", title: "UX Research Intern", description: "Learn by supporting interviews, usability studies and synthesis for a mission-driven health product.", requirements: ["User research", "Communication", "Figma"], salary: 5, experienceLevel: 0, location: "Remote, India", jobType: "Internship", position: 1 },
];

try {
  await connectDB();

  const password = await bcrypt.hash("DemoPass123", 10);
  const recruiter = await User.findOneAndUpdate(
    { email: recruiterEmail },
    { fullname: "Aarav Mehta", email: recruiterEmail, phoneNumber: 9000000001, password, role: "recruiter", profile: { bio: "Demo recruiter account" } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  const applicant = await User.findOneAndUpdate(
    { email: applicantEmail },
    { fullname: "Isha Kapoor", email: applicantEmail, phoneNumber: 9000000002, password, role: "student", profile: { bio: "Demo candidate account", skills: ["React", "JavaScript", "UX research"] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const previousJobs = await Job.find({ created_by: recruiter._id }).select("_id");
  await Application.deleteMany({ $or: [{ applicant: applicant._id }, { job: { $in: previousJobs.map((job) => job._id) } }] });
  await Job.deleteMany({ created_by: recruiter._id });
  await Company.deleteMany({ userId: recruiter._id });

  const companyRecords = new Map();
  for (const company of companies) {
    const record = await Company.create({ ...company, userId: recruiter._id });
    companyRecords.set(record.name, record);
  }

  const jobRecords = await Job.insertMany(jobs.map(({ company, ...job }) => ({
    ...job,
    company: companyRecords.get(company)._id,
    created_by: recruiter._id,
  })));

  const applications = await Application.insertMany([
    { job: jobRecords[0]._id, applicant: applicant._id, status: "accepted" },
    { job: jobRecords[2]._id, applicant: applicant._id, status: "pending" },
  ]);
  await Job.updateOne({ _id: jobRecords[0]._id }, { $push: { applications: applications[0]._id } });
  await Job.updateOne({ _id: jobRecords[2]._id }, { $push: { applications: applications[1]._id } });

  console.log(`Seeded ${companyRecords.size} companies, ${jobRecords.length} jobs and ${applications.length} applications.`);
  console.log("Demo recruiter: demo.recruiter@circlo.dev / DemoPass123");
  console.log("Demo candidate: demo.candidate@circlo.dev / DemoPass123");
} finally {
  await mongoose.disconnect();
}

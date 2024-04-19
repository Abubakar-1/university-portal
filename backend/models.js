const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["student"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  parents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },
  ],
  financial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Financial",
  },
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result",
    },
  ],
});

const parentSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["parent"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  children: [
    {
      name: String,
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    },
  ],
});

const teacherSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["teacher"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  permissions: {
    update_results: {
      type: Boolean,
      default: false,
    },
    student_results_access: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
        students: [
          {
            student: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Student",
            },
            name: String,
            grade: String,
            semester: String,
          },
        ],
      },
    ],
  },
});

const adminSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  permissions: {
    manage_users: {
      type: Boolean,
      default: false,
    },
    manage_subjects: {
      type: Boolean,
      default: false,
    },
    manage_results: {
      type: Boolean,
      default: false,
    },
    manage_finances: {
      type: Boolean,
      default: false,
    },
  },
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
});

const financialSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  tuition_fee: {
    type: Number,
    required: true,
  },
  scholarship: {
    type: Number,
    required: true,
  },
  due_amount: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
});

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model("Class", classSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Parent = mongoose.model("Parent", parentSchema);
const Student = mongoose.model("Student", studentSchema);
const Teacher = mongoose.model("Student", teacherSchema);
const Financial = mongoose.model("Financial", financialSchema);
const Subject = mongoose.model("Subject", subjectSchema);
const Result = mongoose.model("Result", resultSchema);

module.exports = {
  Student,
  Parent,
  Teacher,
  Admin,
  Subject,
  Result,
  Financial,
  Class,
};

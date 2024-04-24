const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["teacher", "student", "admin", "parent"],
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
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    let roleModel;
    let roleDataFields = {}; // Object to store specific fields for the role

    switch (this.role) {
      case "teacher":
        roleModel = "Teacher";
        roleDataFields.subjects = []; // Initialize subjects array for teacher
        break;
      case "student":
        roleModel = "Student";
        break;
      case "admin":
        roleModel = "Admin";
        roleDataFields.permissions = {}; // Initialize permissions object for admin
        break;
      default:
        roleModel = null;
    }

    if (roleModel) {
      const RoleModel = mongoose.model(roleModel);
      const roleData = new RoleModel({
        _id: this._id,
        ...this.toObject(),
        ...roleDataFields, // Spread the specific fields into the role data
      });
      await roleData.save();
    }
  }
  next();
});

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  subjects_registered_for: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      attendance: [
        {
          class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
          status: { type: String, enum: ["present", "absent"] },
        },
      ],
      results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
    },
  ],
});

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
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

  //   student_results: [
  //     {
  //       subject: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "Subject",
  //       },
  //       students: [
  //         {
  //           student: {
  //             type: mongoose.Schema.Types.ObjectId,
  //             ref: "Student",
  //           },
  //           grade: String,
  //           semester: String,
  //         },
  //       ],
  //     },
  //   ],
});

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
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
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

const updateTeacherSubjectList = async (doc) => {
  if (doc instanceof Subject) {
    const teacher = await Teacher.findOne(doc.teacher);

    if (teacher) {
      teacher.subjects.push(doc._id);

      await teacher.save();
    }
  }
};

subjectSchema.post("save", updateTeacherSubjectList);

const resultSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  grade: {
    type: String,
    default: null,
    enum: ["A", "B", "C", "D", "F", null],
  },
  score: {
    type: String,
    default: null,
  },
  remark: {
    type: String,
    default: null,
  },
});

const classSchema = new mongoose.Schema({
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
  date: { type: Date, required: true },
  time: { type: String, required: true },
  attendance: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      status: { type: String, enum: ["present", "absent"] },
    },
  ],
});

const User = mongoose.model("User", userSchema);
const Class = mongoose.model("Class", classSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Result = mongoose.model("Result", resultSchema);
const Student = mongoose.model("Student", studentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Subject = mongoose.model("Subject", subjectSchema);

module.exports = {
  User,
  Student,
  Teacher,
  Admin,
  Subject,
  Result,
  Class,
};

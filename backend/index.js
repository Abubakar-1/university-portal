require("dotenv").config();

const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const port = 5005;
const db = "mongodb://localhost:27017/University-Portal";
const cors = require("cors");
const { default: helmet } = require("helmet");
const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { User, Student, Subject, Class, Teacher, Result } = require("./models");
const multerError = require("./handleError");
const upload = require("./imageValidation");
const { ObjectId } = require("mongodb");

const connectionparams = {
  useNewURLParser: true,
  useUnifiedTopology: true,
};

const corsOption = {
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST"],
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(multerError);

const validateToken = async (req, res, next) => {
  const usersToken =
    req.headers["x-access-token"] ||
    req.cookies.portal ||
    req.headers["authorization"];

  if (!usersToken) return res.status(405).json({ message: "No auth found" });

  try {
    verify(usersToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid token" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error validating token" });
  }
};

const isAdmin = async (req, res, next) => {
  const user = req.decoded;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};

const isTeacher = async (req, res, next) => {
  const user = req.decoded;

  if (user.role !== "teacher") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};

app.post("/register", async (req, res) => {
  const { role, email, password, name, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    await user.save();

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    return res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const { role, _id: id, name } = user;

    const authenticate = await bcrypt.compare(password, user.password);
    if (!authenticate) return res.status(400).json({ message: "Not allowed" });

    const accessToken = await jwt.sign(
      { role, email, name, id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    if (!accessToken) return res.json({ message: "No access token fenerated" });

    res.cookie("portal", accessToken, {
      path: "/",
    });

    return res.status(201).json({ user: user });
  } catch (error) {
    console.error(error);
    res.clearCookie("portal");
    return res.json({ message: "Error logging in" });
  }
});

app.get("/logout", async (req, res, next) => {
  if (req.cookies.portal) {
    res.clearCookie("portal");
    return res
      .status(202)
      .json({ auth: false, loggedIn: false, cookie: "No Cookies" });
  } else {
    res.clearCookie("portal");
    return res
      .status(202)
      .json({ auth: false, loggedIn: false, cookie: "No Cookies" });
  }
  next();
});

app.get("/user", validateToken, async (req, res) => {
  var token = req.cookies.portal;

  if (!token)
    return res.status(400).json({
      message: "You cannot perform any activities until you are logged in",
    });

  verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      req.decoded = decoded;

      try {
        const user = await User.findOne({ email: req.decoded.email }).select(
          "-password"
        );

        if (user) {
          let roleModel;
          let populateFields = [];

          switch (user.role) {
            case "student":
              roleModel = "Student";
              populateFields = [
                "subjects_registered_for.subject",
                {
                  path: "subjects_registered_for",
                  populate: {
                    path: "attendance.class",
                    select: "_id teacher subject date time",
                  },
                },
              ];

              const studentUser = await Student.findOne({
                email: user.email,
              });

              const subjectsPopulatedResults =
                studentUser.subjects_registered_for.map((subject) => ({
                  path: "subjects_registered_for",
                  match: { subject: subject._id }, // Match the subject id
                  populate: {
                    path: "results",
                    select: "grade score remark subject",
                  },
                }));

              populateFields.push(...subjectsPopulatedResults);

              break;
            case "teacher":
              roleModel = "Teacher";
              populateFields = ["subjects"];
              break;
            case "admin":
              roleModel = "Admin";
              break;
            default:
              roleModel = null;
          }

          if (roleModel) {
            const finalModel = mongoose.model(roleModel);

            const populateOptions = populateFields.map((field) => {
              if (typeof field === "string") {
                return field; // If it's a string, directly populate the field
              } else if (typeof field === "object" && field.populate) {
                return {
                  path: field.path, // Path to populate
                  populate: {
                    path: field.populate.path, // Nested path to populate
                    select: field.populate.select, // Fields to select in the nested path
                  },
                };
              } else {
                return null; // Invalid field, ignore it
              }
            });

            const userDetails = await finalModel
              .findOne({ email: req.decoded.email })
              .populate(populateOptions.filter((option) => option !== null))
              .exec();

            return res
              .status(200)
              .json({ userDetails: userDetails, role: user.role });
          }
        } else {
          return res
            .status(403)
            .json({ message: "Unable to fetch requested data" });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(404)
          .json({ message: "Unable to fetch your requested data" });
      }
    }
  });
});

app.post("/create-subject", validateToken, isAdmin, async (req, res) => {
  const { name, code, teacher, description } = req.body;

  try {
    const subjectExists = await Subject.findOne({ code });
    if (subjectExists)
      return res.status(400).json({ message: "Subject already exists" });

    const newSubject = new Subject({
      name,
      code,
      teacher,
      description,
    });

    await newSubject.save();

    return res.status(201).json({ message: "Subject created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating subject" });
  }
});

app.post("/register-subject", validateToken, async (req, res) => {
  try {
    const { subjectId } = req.body;
    const { studentId } = req.query;

    // Find the student by ID
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the subject by ID
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Check if the student is already registered for the subject
    const alreadyRegistered = student.subjects_registered_for.some((subject) =>
      subject.subject.equals(subjectId)
    );

    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ message: "Student is already registered for this subject" });
    }

    // Add the subject to the student's subjects_registered_for array

    // If not, create a new entry for the current subject
    student.subjects_registered_for.push({
      subject: subjectId,
      attendance: [],
    });

    // Find the index of the current subject in the subjects_registered_for array
    const subjectIndex = student.subjects_registered_for.findIndex((entry) =>
      entry.subject.equals(subjectId)
    );

    // Fetch all classes associated with the subject
    const classes = await Class.find({ subject: subjectId });

    // Populate the student's attendance array with entries for each class
    for (const classObj of classes) {
      const classAttendance = {
        class: classObj._id,
        status: "absent",
      };
      // Add the student to the class attendance array
      classObj.attendance.push({
        student: student._id,
        status: "absent",
      });
      // Save the updated class
      await classObj.save();

      // Add the class to the student's attendance array
      student.subjects_registered_for[subjectIndex].attendance.push(
        classAttendance
      );
    }

    await student.save();

    res
      .status(200)
      .json({ message: "Student registered under subject successfully" });
  } catch (error) {
    console.error("Error registering student under subject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/create-class", validateToken, isTeacher, async (req, res) => {
  try {
    const { subjectId, teacherId, date, time } = req.body;

    // Check if subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Create the class
    const newClass = new Class({
      subject: subjectId,
      teacher: teacherId,
      date,
      time,
      attendance: [],
    });
    await newClass.save();

    // Fetch students registered for the subject
    const students = await Student.find({
      subjects_registered_for: { $elemMatch: { subject: subjectId } },
    });

    // Update attendance for each student and class attendance
    const attendanceEntries = students.map((student) => ({
      student: student._id,
      status: "absent",
    }));

    newClass.attendance = attendanceEntries;
    await newClass.save();

    // Update each student's attendance array
    for (const student of students) {
      const subjectIndex = student.subjects_registered_for.findIndex(
        (subject) => subject.subject.equals(subjectId)
      );
      if (subjectIndex !== -1) {
        student.subjects_registered_for[subjectIndex].attendance.push({
          class: newClass._id,
          status: "absent",
        });
      }
      await student.save();
    }

    res.status(201).json(newClass);
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/create-result", validateToken, async (req, res) => {
  try {
    const { subject, teacher, student, score } = req.body;

    const grade =
      score >= 90
        ? "A"
        : score >= 80
          ? "B"
          : score >= 70
            ? "C"
            : score >= 60
              ? "D"
              : "F";

    const remark = {
      A: "Excellent",
      B: "Good",
      C: "Average",
      D: "Below Average",
      F: "Fail",
    }[grade];

    const newResult = new Result({
      subject,
      teacher,
      student,
      grade,
      score,
      remark,
    });

    const savedResult = await newResult.save();

    await Student.findOneAndUpdate(
      { _id: student, "subjects_registered_for.subject": subject },
      { $push: { "subjects_registered_for.$.results": savedResult._id } }
    );

    return res
      .status(201)
      .json({ message: "Result created successfully", result: savedResult });
  } catch (error) {
    console.error("Error creating result:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/mark-attendance", validateToken, async (req, res) => {
  try {
    const { classId, studentId } = req.body;

    // Find the class based on the provided classId
    const foundClass = await Class.findById(classId);

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if the student is registered for this class
    const studentAttendance = foundClass.attendance.find((entry) =>
      entry.student.equals(studentId)
    );
    if (!studentAttendance) {
      return res
        .status(400)
        .json({ message: "Student is not registered for this class" });
    }

    // Mark attendance for the student
    studentAttendance.status = "present";
    await foundClass.save();

    // Update attendance status in the student's record
    const student = await Student.findById(studentId);
    console.log(student);

    // Find the subject index in the subjects_registered_for array
    const subjectIndex = student.subjects_registered_for.findIndex((entry) =>
      entry.subject.equals(foundClass.subject)
    );
    console.log(subjectIndex);

    // Find the class index in the attendance array for the specific subject
    const classIndex = student.subjects_registered_for[
      subjectIndex
    ].attendance.findIndex((entry) => entry.class.equals(classId));
    console.log(classIndex);

    // Update the attendance status for the specific class
    student.subjects_registered_for[subjectIndex].attendance[
      classIndex
    ].status = "present";

    await student.save();

    return res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/image", validateToken, upload, async (req, res) => {
  const user = await User.findOne({
    email: "student1@gmail.com",
  });

  if (!user) return res.send("User not found");
  console.log(user);

  try {
    const update = await User.updateOne(
      { email: "student1@gmail.com" },
      { $set: { name: "Student 1" } }
    );

    if (update) return res.send("Successful");
  } catch (error) {
    console.log(error);
    return res.send("error");
  }
  return res.send("Success");
});

app.get("/teacher-class", async (req, res) => {
  try {
    const { teacherId } = req.query;

    // Find classes where the teacher's ID matches
    const classes = await Class.find({ teacher: teacherId }).populate(
      "subject",
      "code"
    );
    // .populate("attendance.student");

    // If no classes found for the teacher, return an empty array
    if (!classes || classes.length === 0) {
      return res.status(200).json([]);
    }

    // Return the classes data
    return res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/student-class", async (req, res) => {
  try {
    const { studentId } = req.query;

    // Find classes where the teacher's ID matches
    const classes = await Class.find({ student: studentId }).populate(
      "subject",
      "code"
    );
    // .populate("attendance.student");

    // If no classes found for the teacher, return an empty array
    if (!classes || classes.length === 0) {
      return res.status(200).json([]);
    }

    // Return the classes data
    return res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/specific-class", async (req, res) => {
  try {
    const { classId } = req.query;

    // Find classes where the teacher's ID matches
    const classes = await Class.find({ _id: classId })
      .populate("subject", "code")
      .populate("attendance.student", "name");
    // .populate("attendance.student");

    // If no classes found for the teacher, return an empty array
    if (!classes || classes.length === 0) {
      return res.status(200).json([]);
    }

    // Return the classes data
    return res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/subjects", validateToken, async (req, res) => {
  try {
    const subjects = await Subject.find().populate("teacher", "name");

    if (!subjects) {
      return res.status(404).send("Teachers info not found");
    }

    return res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users", validateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) return res.status(404).send("Users info not found");

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/students-per-subject", validateToken, isTeacher, async (req, res) => {
  const { subjectId } = req.query;

  try {
    const students = await Student.find({
      "subjects_registered_for.subject": { $in: subjectId },
    });

    if (!students) return res.status(404).send("Students info not found");

    return res.status(200).send(students);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/students", validateToken, isAdmin, async (req, res) => {
  try {
    const students = await Student.find();

    if (!students) return res.status(404).send("Students info not found");

    return res.status(200).send(students);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/teachers", validateToken, isAdmin, async (req, res) => {
  try {
    const teachers = await Teacher.find();

    if (!teachers) return res.status(404).send("Teachers info not found");

    return res.status(200).send(teachers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/results", validateToken, isAdmin, async (req, res) => {
  try {
    const results = await Result.find()
      .populate("subject", "name")
      .populate("teacher", "name")
      .populate("student", "name");

    if (!results) return res.status(404).send("Results info not found");

    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/student-result", validateToken, async (req, res) => {
  const { studentId } = req.query;
  try {
    const results = await Result.find({ student: studentId })
      .populate("subject", "name")
      .populate("teacher", "name")
      .populate("student", "name");

    if (!results) return res.status(404).send("Results info not found");

    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/results-per-subject", validateToken, isTeacher, async (req, res) => {
  const { subjectId } = req.query;
  try {
    const results = await Result.find({ subject: subjectId })
      .populate("student", "name")
      .populate("subject", "code");
    if (!results) return res.status(404).send("Results info not found");

    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/classes", validateToken, isAdmin, async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("teacher", "name")
      .populate("subject", "name")
      .populate("attendance.student", "name");

    if (!classes) return res.status(404).send("Classes info not found");

    return res.status(200).send(classes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//gives your server a layer one protection from ddos

mongoose
  .connect(db, connectionparams)
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.log("error", error);
  });

http.listen(port, () => {
  console.log("Server connected");
});

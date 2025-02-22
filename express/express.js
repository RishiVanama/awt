const express = require('express');
const app = express();

app.use(express.json());

app.listen(2000, () => {
  console.log("Server Started...");
});

let student = [
    {id: 1, name: 'Rishi', age: 20, branch: 'IT'},
    {id: 2, name: 'abc', age: 19, branch: 'CSE'},
    {id: 3, name: 'xyz', age: 20, branch: 'EEE'}
];

app.get("/student/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    let std = student.find(s => s.id === id); 
    if (std) {
        res.status(200).json({
            "message": "Student Found",
            "student": std 
        });
    } else {
        res.status(404).json({
            "message": "Student Not Found"
        });
    }
});

app.delete("/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const studentIndex = student.findIndex(s => s.id === id);
    
    if (studentIndex !== -1) {
        student.splice(studentIndex, 1); 
        res.status(200).json({
            "message": "Student deleted successfully"
        });
    } else {
        res.status(404).json({
            "message": "Student Not Found"
        });
    }
});

app.get("/students/branch/:branch", (req, res) => {
    const branch = req.params.branch;
    const filteredStudents = student.filter(s => s.branch === branch);

    if (filteredStudents.length > 0) {
        res.status(200).json({
            "message": "Students Found",
            "students": filteredStudents
        });
    } else {
        res.status(404).json({
            "message": "No Students found in this branch"
        });
    }
});

app.post("/students", (req, res) => {
  const { name, age, branch } = req.body;
  
  if (!name || !age || !branch) {
      return res.status(400).json({
          "message": "All fields (name, age, branch) are required"
      });
  }

  const newId = student.length ? student[student.length - 1].id + 1 : 1;
  const newStudent = { id: newId, name, age, branch };
  student.push(newStudent);

  res.status(201).json({
      "message": "Student added successfully",
      "student": newStudent
  });
});

// PUT route to update student details
app.put("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, branch } = req.body;

  const stdIndex = student.findIndex(s => s.id === id);

  if (stdIndex !== -1) {
    const updatedStudent = {
      id,
      name: name || student[stdIndex].name,
      age: age || student[stdIndex].age,
      branch: branch || student[stdIndex].branch
    };

    student[stdIndex] = updatedStudent;

    res.status(200).json({
      "message": "Student updated successfully",
      "student": updatedStudent
    });
  } else {
    res.status(404).json({
      "message": "Student Not Found"
    });
  }
});


// app.use(express.json());
// app.post("/students",(req,res)=>{
//     const newstudent=req.body;
//     student.push(newstudent);
//     res.status(201).json({
//         "message":"student added successfully",
//         "students": students
//     });
// });

// app.use(express.json());
// app.post("/addstudent",(req,res)=>{
//     const student=req.body;
//     students.push(student);
//     res.status(200).json({
//         "message":"student added successfully",
//         "students": students
//     });
// });

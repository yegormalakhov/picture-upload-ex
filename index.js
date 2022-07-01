const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");
const PORT = 3000;
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //original name with extention
  },
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: path.join(__dirname, "public/images/") });

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.static("public"));
// const upload = multer()

// app.post('/profile', upload.none(), function (req, res, next) {
//   // req.body contains the text fields
// })
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload-profile-pic",
  upload.single(`profile_pic`),

  (req, res, next) => {
    console.log(req.file);
    const fileName = req.file.originalname;
    res.send(
      `<h2>Here is the picture:</h2><img src=/images/${fileName} alt="something" widht="500px" height="500px"/>`
    );
  }
);

app.listen(PORT);

// {
//     fieldname: 'profile_pic',
//     originalname: 'markus-spiske-cvBBO4PzWPg-unsplash.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: 'C:\\Users\\Admin\\Desktop\\WBS project and exercises\\picture-upload-ex\\public\\images\\',
//     filename: 'f0d30a0eae782a335f9b80af4ed348b9',
//     path: 'C:\\Users\\Admin\\Desktop\\WBS project and exercises\\picture-upload-ex\\public\\images\\f0d30a0eae782a335f9b80af4ed348b9',
//     size: 5851327
//   }

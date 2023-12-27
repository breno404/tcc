import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdtemp("uploads/tmp", { encoding: "utf8" }, (err, folder) => {
      cb(null, folder);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;

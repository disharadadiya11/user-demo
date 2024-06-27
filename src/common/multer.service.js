const multer = require("multer");
const path = require("path");

module.exports = class MulterService {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "src/uploads");
      },
      filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
      },
    });
    this.fileFilter = (req, file, cb) => {
      const allowedExtensions = [".jpeg", ".jpg", ".png", ".csv", ".pdf"];
      const fileExtension = path.extname(file.originalname).toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        return cb(null, true);
      } else {
        cb("Error: Images only! (jpeg, jpg, png, gif)");
      }
    };
    this.upload = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: { fileSize: 1000000 }, // 1MB file size limit
    });
  }

  //-------------------------------------------------------- [ token ] -----------------------------------------------------------------
  singleFileUpload(fieldName) {
    return this.upload.single(fieldName);
  }

  async multipleFileUpload(fieldName) {
    return this.upload.array(fieldName, 5);
  }
};

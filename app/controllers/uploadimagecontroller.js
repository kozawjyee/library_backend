var multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.uploadImage = async (req, res) => {
  const name = uuidv4();
  console.log("imagename", req.files);
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../static/uploads/images"));
    },
    filename: (req, file, cb) => {
      cb(null, name + path.extname(file.originalname));
    },
  });

  const storeImage = multer({
    storage: multerStorage,
  }).single("image");

  storeImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        message: "upload error",
      });
    }

    const path = "/static/uploads/images/";
    return res.status(201).json({
      filename: req.file.filename,
      src: `${path}${req.file.filename}`,
    });
  });
};

exports.showImage = async (req, res) => {
  console.log(req.params);
};

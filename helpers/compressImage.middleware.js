const path = require("path");
const { promises: fsPromises } = require("fs");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const IMAGES_PATH = path.join(__dirname, "../public/images");

exports.compressImage = async (req, res, next) => {
  const { filename, path: filePath } = req.file;
  const oldPath = filePath;

  const PATH_GET = filePath.replaceAll(`\\`, "/");
  const PATH_SET = IMAGES_PATH.replaceAll(`\\`, "/");
  await imagemin([PATH_GET], {
    destination: PATH_SET,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  req.file.destination = IMAGES_PATH;
  req.file.path = path.join(IMAGES_PATH, filename);

  await fsPromises.unlink(oldPath);

  next();
};

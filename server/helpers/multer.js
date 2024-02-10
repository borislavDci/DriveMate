import multer from "multer";
import bytes from "bytes";

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./avatars");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const originalNameExtension = file.originalname.split(".")[0];
    cb(null, `${originalNameExtension}-${Date.now()}.${ext}`);
  },
});

const listingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./listingimages");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const originalNameExtension = file.originalname.split(".")[0];
    cb(null, `${originalNameExtension}-${Date.now()}.${ext}`);
  },
});

const uploadListingImages = multer({
  storage: listingStorage,
  limits: { fileSize: bytes("10MB") },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: bytes("1MB") },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

export { uploadAvatar, uploadListingImages };

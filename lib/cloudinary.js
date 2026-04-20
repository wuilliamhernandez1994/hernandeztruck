import "server-only";
import { v2 as cloudinary } from "cloudinary";

// Configura una sola vez; se reutiliza en las API routes del servidor.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

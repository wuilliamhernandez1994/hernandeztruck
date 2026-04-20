import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const FOLDER = process.env.CLOUDINARY_FOLDER || "mecatruck/evidencias";
const SECRET = process.env.UPLOAD_SECRET || "mecatruck2025";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const code = String(formData.get("code") || "").trim();
    const checkOnly = formData.get("checkOnly") === "1";
    const file = formData.get("file");
    const title = String(formData.get("title") || "");
    const desc = String(formData.get("desc") || "");

    if (code !== SECRET) {
      return NextResponse.json(
        { error: "Código de acceso incorrecto." },
        { status: 401 }
      );
    }

    if (checkOnly) {
      return NextResponse.json({ ok: true });
    }

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No se recibió ningún archivo." },
        { status: 400 }
      );
    }

    const isVideo = file.type.startsWith("video/");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: FOLDER,
            resource_type: isVideo ? "video" : "image",
            context: `title=${title}|desc=${desc}`,
            ...(isVideo
              ? {}
              : {
                  transformation: [
                    { quality: "auto", fetch_format: "auto" },
                    { width: 1920, height: 1080, crop: "limit" },
                  ],
                }),
          },
          (error, uploadResult) => {
            if (error) reject(error);
            else resolve(uploadResult);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      id: result.public_id,
      url: result.secure_url,
      type: isVideo ? "video" : "photo",
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      title,
      desc,
      createdAt: result.created_at,
    });
  } catch (err) {
    console.error("[upload] error:", err);
    return NextResponse.json(
      { error: err.message || "Error al subir el archivo." },
      { status: 500 }
    );
  }
}

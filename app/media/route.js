import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const FOLDER = process.env.CLOUDINARY_FOLDER || "mecatruck/evidencias";

/**
 * GET /api/media
 * Devuelve todas las imágenes y videos guardados en Cloudinary,
 * ordenados por fecha de creación (más recientes primero).
 */
export async function GET() {
  try {
    // Traer imágenes y videos en paralelo
    const [imgResult, vidResult] = await Promise.all([
      cloudinary.api.resources({
        type:          "upload",
        prefix:        FOLDER,
        resource_type: "image",
        max_results:   100,
        context:       true,   // trae title y desc guardados en el context
      }),
      cloudinary.api.resources({
        type:          "upload",
        prefix:        FOLDER,
        resource_type: "video",
        max_results:   50,
        context:       true,
      }),
    ]);

    // Normalizar formato de respuesta
    const normalize = (resource, type) => ({
      id:        resource.public_id,
      url:       resource.secure_url,
      type,
      width:     resource.width,
      height:    resource.height,
      format:    resource.format,
      bytes:     resource.bytes,
      title:     resource.context?.custom?.title  || "",
      desc:      resource.context?.custom?.desc   || "",
      createdAt: resource.created_at,
    });

    const media = [
      ...imgResult.resources.map(r => normalize(r, "photo")),
      ...vidResult.resources.map(r => normalize(r, "video")),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json(media, {
      headers: {
        // Cache corto: 30 s en CDN, 10 s stale-while-revalidate
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=10",
      },
    });
  } catch (err) {
    console.error("[media] error:", err);
    return NextResponse.json(
      { error: err.message || "Error al obtener los archivos." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/media
 * Body: { publicId: string, code: string }
 * Elimina un archivo de Cloudinary.
 */
export async function DELETE(request) {
  try {
    const { publicId, code, resourceType = "image" } = await request.json();
    const SECRET = process.env.UPLOAD_SECRET || "mecatruck2025";

    if (code !== SECRET) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

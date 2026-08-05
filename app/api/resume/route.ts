import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "resume",
      "Fullstack.pdf"
    );
    const nodeBuffer = await readFile(filePath);

    // Convert Node.js Buffer → ArrayBuffer (required by the Web API Response)
    // NextResponse silently drops a Node Buffer body (produces 204); use native Response instead.
    const arrayBuffer = nodeBuffer.buffer.slice(
      nodeBuffer.byteOffset,
      nodeBuffer.byteOffset + nodeBuffer.byteLength
    ) as ArrayBuffer;

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[api/resume] Failed to read resume PDF:", error);
    return new Response("Resume not found", { status: 404 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtention = path.extname(file.name);
    const filename = `${uuidv4()}${fileExtention}`;

    const filePath = path.join(
      process.cwd(),
      "public/assets/image/product",
      filename,
    );

    await writeFile(filePath, buffer);

    return NextResponse.json({ message: "Success", filename, status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};

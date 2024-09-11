import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { z } from "zod";
import { connectMongoDB } from "@/services/database.service";
import Letter from "@/models/letter";

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { letterId: string } }
) {
  const letterId = params.letterId;

  console.log("DELETE ID: ", letterId);

  const schema = z.object({
    letterId: z.string(), // Ensure it's a valid ObjectId format
  });
  const parse = schema.safeParse({
    letterId: letterId,
  });

  if (!parse.success) {
    return NextResponse.json(
      { message: "Failed to delete letter." + parse.error.issues },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const deletedLetter = await Letter.deleteOne({ _id: letterId }); // Use _id for MongoDB comparison

    if (!deletedLetter.deletedCount) {
      return NextResponse.json(
        { message: "Letter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Letter deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting letter:", error },
      { status: 500 }
    );
  }
}

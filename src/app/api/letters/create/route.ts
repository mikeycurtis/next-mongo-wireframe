import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoDB } from "@/services/database.service";
import Letter from "@/models/letter";
import mongoose, { mongo } from "mongoose";

export async function POST(req: NextRequest) {
  const { title, sender, receiver, message, userId } = await req.json();

  const schema = z.object({
    title: z.string().min(1),
    sender: z.string().min(1),
    receiver: z.string().min(1),
    message: z.string(),
    userId: z.string(),
  });
  const parse = schema.safeParse({
    title: title,
    sender: sender,
    receiver: receiver,
    message: message,
    userId: userId,
  });

  if (!parse.success) {
    return NextResponse.json(
      { message: "Failed to create new letter." + parse.error.issues },
      { status: 400 }
    );
  }
  const data = parse.data;

  try {
    await connectMongoDB();
    Letter.create({ title, sender, receiver, message, userId });
    return NextResponse.json(
      { message: "Letter succesfully created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating letter:", error },
      { status: 500 }
    );
  }
}

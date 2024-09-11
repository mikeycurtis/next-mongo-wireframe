import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectMongoDB } from "@/services/database.service";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();

  const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1),
    password: z.string(),
  });
  const parse = schema.safeParse({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  if (!parse.success) {
    return { message: "Failed to create new user." + parse.error.issues };
  }

  const data = parse.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 409 } // Conflict status code
      );
    }
    User.create({ firstName, lastName, email, password: hashedPassword });
    revalidatePath("/login");
    return NextResponse.json(
      { message: "User succesfully registered!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user:", error },
      { status: 500 }
    );
  }
}

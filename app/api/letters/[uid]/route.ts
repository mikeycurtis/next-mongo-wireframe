import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { z } from 'zod';
import { connectMongoDB } from '@/services/database.service';
import Letter from '@/models/letter';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { uid: string } }
) {
  const userId = params.uid || null;
  console.log('UID', userId);

  const schema = z.object({
    userId: z.string(),
  });
  const parse = schema.safeParse({
    userId: userId,
  });

  if (!parse.success) {
    return NextResponse.json(
      { message: 'Failed to get letters.' + parse.error.issues },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const letters = await Letter.find({ userId: userId });
    console.log('LETTERS', letters);
    return NextResponse.json(
      { message: 'Letters retrieved successfully', letters },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retrieving letters:', error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { uid: string } }
) {
  const letterId = params.uid;

  console.log('DELETE ID: ', letterId);

  const schema = z.object({
    id: z.string().uuid(), // Ensure it's a valid ObjectId format
  });
  const parse = schema.safeParse({
    id: letterId,
  });

  if (!parse.success) {
    return NextResponse.json(
      { message: 'Failed to delete letter.' + parse.error.issues },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const deletedLetter = await Letter.deleteOne({ _id: letterId }); // Use _id for MongoDB comparison

    if (!deletedLetter.deletedCount) {
      return NextResponse.json(
        { message: 'Letter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Letter deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting letter:', error },
      { status: 500 }
    );
  }
}

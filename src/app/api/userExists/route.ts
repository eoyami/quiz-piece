import { NextRequest, NextResponse } from "next/server";
import { User } from "../db/models/Users";
import connectDB from "../db/connectDB";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email } = await req.json();
  const user = await User.findOne({ email }).select("_id");

  if (user) {
    return NextResponse.json({ user }, { status: 409 });
  }
  return NextResponse.json({ user }, { status: 404 });
}

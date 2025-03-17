import { NextResponse } from "next/server";
import { User } from "../db/models/Users";
import connectDB from "../db/connectDB";

export async function GET() {
  await connectDB();
  const user = await User.find({});
  return NextResponse.json(user);
}

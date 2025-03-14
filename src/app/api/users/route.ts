import { NextRequest, NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import { User } from "../models/Users";

connectDB();

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  const createdUser = await User.create({ username, email, password });
  console.log(createdUser);
  return NextResponse.json(createdUser);
}

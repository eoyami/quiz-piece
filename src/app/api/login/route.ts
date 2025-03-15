import { NextRequest, NextResponse } from "next/server";
import connectDB from "../db/connectDB";

export async function POST(req: NextRequest) {
  connectDB();
  const { email, password } = await req.json();
  return NextResponse.json({ email, password });
}

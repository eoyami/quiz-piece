import { NextResponse } from "next/server";
import connectDB from "../db/connectDB";
import Quizes from "../db/models/Quizes";

export async function GET() {
  await connectDB();
  const user = await Quizes.find({});
  return NextResponse.json(user);
}

import { NextResponse, NextRequest } from "next/server";
import { User } from "../db/models/Users";
import connectDB from "../db/connectDB";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();
  const username = email;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`Novo usuário criado: ${createdUser.username}`);
  return NextResponse.json(
    { message: "Usuário criado com sucesso" },
    { status: 201 }
  );
}

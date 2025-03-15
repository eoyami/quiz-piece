import { NextResponse, NextRequest } from "next/server";
import { User } from "../db/models/Users";
import connectDB from "../db/connectDB";
import bcrypt from "bcryptjs";
import { z, ZodString } from "zod";

export async function POST(req: NextRequest) {
  await connectDB();

  const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  });

  const requestData = await req.json();

  const { email } = RegisterSchema.pick({ email: true }).parse(requestData);

  const existingUser = await User.findOne({ email }).select("_id");

  if (existingUser) {
    return NextResponse.json(
      { message: "Usuário já registrado" },
      { status: 409 }
    );
  }
  const { password, passwordConfirmation } = RegisterSchema.pick({
    password: true,
    passwordConfirmation: true,
  }).parse(requestData);
  console.log(password, passwordConfirmation);
  if (!email || !password || !passwordConfirmation) {
    return NextResponse.json(
      { message: "Preencha todos os campos" },
      { status: 400 }
    );
  }

  if (password !== passwordConfirmation) {
    return NextResponse.json(
      { message: "Senhas não conferem" },
      { status: 400 }
    );
  }
  const username = email.split("@")[0];
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

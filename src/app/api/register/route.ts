import { NextResponse, NextRequest } from "next/server";
import { User } from "../db/models/Users";
import connectDB from "../db/connectDB";
import bcrypt from "bcryptjs";
import { RegisterType, registerSchema } from "./schemas/register.schema";
import { validateSchema } from "../middlewares/user.validation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validateError = validateSchema(registerSchema, body);

  if (validateError) return validateError;

  const { email, password, passwordConfirmation }: RegisterType = body;
  await connectDB();
  const existingUser = await User.findOne({ email }).select("_id");

  if (!email || !password || !passwordConfirmation) {
    return NextResponse.json(
      { message: "Preencha todos os campos" },
      { status: 400 }
    );
  }
  if (existingUser) {
    return NextResponse.json(
      { message: "Usuário já registrado" },
      { status: 409 }
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

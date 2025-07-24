import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const sql = "SELECT * FROM recipe;";
  const [recipes] = await db.query(sql);
  return NextResponse.json({ recipes });
}

export const POST = async () => {
  return new NextResponse("not authorized");
};

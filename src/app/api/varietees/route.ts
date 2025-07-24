import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const sql = "SELECT * FROM variete;";
  const [varietes] = await db.query(sql);
  return NextResponse.json({ varietes });
}

export const POST = async () => {
  return new NextResponse("not authorized");
};

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const sql = "SELECT * FROM recipe;";
  const [recipes] = await db.query(sql);
  return NextResponse.json({ recipes });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json(
      { error: "Recipe ID is required" },
      { status: 400 }
    );
  }

  const sql = "DELETE FROM recipe WHERE id = ?;";
  await db.query(sql, [id]);

  return NextResponse.json({ message: "Recipe deleted successfully" });
}

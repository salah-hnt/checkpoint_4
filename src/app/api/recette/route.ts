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

export async function POST(request: Request) {
  const { name, photo, country, ingredients, instructions } =
    await request.json();

  if (!name || !photo || !country || !ingredients || !instructions) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    );
  }

  const sql = `
    INSERT INTO recipe (name, photo, country, ingredients, instructions)
    VALUES (?, ?, ?, ?, ?)
  `;

  await db.query(sql, [name, photo, country, ingredients, instructions]);

  return NextResponse.json({ message: "Recette créée avec succès." });
}

export async function deleteRecette(id: number) {
  const res = await fetch("/api/recette", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Erreur lors de la suppression");
  }

  const data = await res.json();
  return data.message || "Recette supprimée";
}

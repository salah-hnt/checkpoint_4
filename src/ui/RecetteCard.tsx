"use client";

import { deleteRecette } from "@/lib/deleteRecipe";
import { useRouter } from "next/navigation";
import styles from "@/app/recette/recette.module.css";
import { recipeModel } from "@/model/recipeModel";

export default function RecetteCard({ recipe }: { recipe: recipeModel }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const message = await deleteRecette(recipe.id);
      alert(message);
      router.refresh();
    } catch (error) {
      alert("Erreur : " + (error as Error).message);
    }
  };

  return (
    <div className={styles.recipeCard}>
      <img src={recipe.photo} alt={recipe.name} className={styles.image} />
      <h2 className={styles.title}>{recipe.name}</h2>
      <p className={styles.country}>Origine : {recipe.country}</p>
      <p className={styles.ingredients}>Ingrédients : {recipe.ingredients}</p>
      <p className={styles.instructions}>
        Instructions : {recipe.instructions}
      </p>
      <button className={styles.deleteButton} onClick={handleDelete}>
        Supprimer
      </button>
    </div>
  );
}

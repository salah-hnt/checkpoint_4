import styles from "./recette.module.css";
import { recipeModel } from "@/model/recipeModel";
import RecetteCard from "@/ui/RecetteCard";
import AddRecetteForm from "@/ui/AddRecetteForm";
import Link from "next/link";

const recettes = async () => {
  const response = await fetch("http://localhost:3000/api/recette");
  const result = await response.json();
  const recipes: recipeModel[] = result.recipes;

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Recettes de Café</h1>

      <div className={styles.homeButtonContainer}>
        <Link href="/" className={styles.homeButton}>
          Accueil
        </Link>
      </div>

      <AddRecetteForm />

      <p className={styles.subtitle}>
        Découvrez nos délicieuses recettes de café.
      </p>

      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecetteCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default recettes;

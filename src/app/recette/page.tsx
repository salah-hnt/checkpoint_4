import styles from "./recette.module.css";
import { recipeModel } from "@/model/recipeModel";

const recettes = async () => {
  const response = await fetch("http://localhost:3000/api/recette");
  const result = await response.json();
  const recipes: recipeModel[] = result.recipes;

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Recettes de Café</h1>
      <p className={styles.subtitle}>
        Découvrez nos délicieuses recettes de café.
      </p>

      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipeCard}>
            <img
              src={recipe.photo}
              alt={recipe.name}
              className={styles.image}
            />
            <h2 className={styles.title}>{recipe.name}</h2>
            <p className={styles.country}>Origine : {recipe.country}</p>
            <p className={styles.ingredients}>
              Ingrédients : {recipe.ingredients}
            </p>
            <p className={styles.instructions}>
              Instructions : {recipe.instructions}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default recettes;

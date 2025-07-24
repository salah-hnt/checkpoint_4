import styles from "./varietes.module.css";
import { VarieteeModel } from "@/model/varieteeModel";

const Varietes = async () => {
  const response = await fetch("http://localhost:3000/api/varietees");
  const result = await response.json();
  const varietees: VarieteeModel[] = result.varietes;

  if (!varietees || varietees.length === 0) {
    return <p>Aucune variété de café trouvée.</p>;
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.decoratedTitle}>Les Variétés de Café</h1>

      <div className={styles.inlineLinks}>
        <a href="/" className={styles.link}>
          Accueil
        </a>
        <a href="/recette" className={styles.link}>
          Recettes
        </a>
      </div>

      <div className={styles.grid}>
        {varietees.map((varietee) => {
          const cardStyle =
            varietee.nom === "Arabica"
              ? styles.cardArabica
              : varietee.nom === "Robusta"
              ? styles.cardRobusta
              : varietee.nom === "Liberica"
              ? styles.cardLiberica
              : styles.cardExcelsa;

          return (
            <div key={varietee.nom} className={`${styles.card} ${cardStyle}`}>
              <img
                src={varietee.image}
                alt={varietee.nom}
                className={styles.image}
              />
              <div className={styles.cardContent}>
                <h2>{varietee.nom}</h2>
                <p>{varietee.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Varietes;

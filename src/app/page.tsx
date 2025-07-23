import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Clarté Noir</h1>
        <h2 className={styles.subtitle}>À la découverte du café</h2>
      </header>

      <div className={styles.hero}>
        <Image
          src="/cofee picture/photo cafe immersif.png"
          alt="Image immersive de café"
          fill
          className={styles.image}
        />

        <div className={styles.links}>
          <Link
            href="/recette"
            className={`${styles.link} ${styles.offsetTop}`}
          >
            Nos recettes
          </Link>
          <Link
            href="/varietes"
            className={`${styles.link} ${styles.offsetBottom}`}
          >
            Découvrir les variétés
          </Link>
        </div>
      </div>
    </div>
  );
}

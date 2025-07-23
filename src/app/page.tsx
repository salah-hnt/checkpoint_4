import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageBackground}>
      <header className={styles.header}>
        <h1>Clarté Noir</h1>
        <h2 className={styles.stylizedH2}>À la découverte du café</h2>
      </header>

      <div className={styles.heroSection}></div>
    </div>
  );
}

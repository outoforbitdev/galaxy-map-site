import styles from "./page.module.css";

export default function NotFound() {
  return(
    <div className={styles.page}>
      <main className={styles.main}>
        Page not found.
      </main>
    </div>
  );
}
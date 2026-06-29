import { getTours } from "@/services/tourService";
import styles from "./page.module.css";
import TourCard from "@/components/shared/TourCard";

export const revalidate = 300;

export default async function Home() {
  let tours = [];

  try {
    tours = await getTours();
  } catch (error) {
    console.error("خطا:", error);
  }
  return (
    <main className={styles.main}>
      <section className={styles.banner}>Banner</section>
      <div className={styles.container}>
        <section className={styles.searchSection}>Searchbox</section>

        <section className={styles.tourSection}>
          <h2>همه تور‌ها</h2>
          <div className={styles.tourGrid}>
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

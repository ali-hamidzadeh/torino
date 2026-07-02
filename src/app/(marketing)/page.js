import { getTours } from "@/services/tourService";
import TourCard from "@/components/shared/MainPage/TourCard";
import SearchForm from "@/components/shared/MainPage/SearchForm";
import Image from "next/image";

import styles from "./page.module.css";
import banner from "@public/banner.png";
import CallBanner from "@/components/shared/MainPage/callBanner";
import WhyUs from "@/components/shared/MainPage/WhyUs";

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
      <section className={styles.banner}>
        <Image
          src={banner}
          alt="banner"
          width={1440}
          height={350}
          className={styles.bannerImage}
        />
      </section>
      <div className={styles.container}>
        <section className={styles.searchSection}>
          <p>
            <span className={styles.brand}>تورینو</span> برگزار کننده بهترین تور
            های داخلی و خارجی
          </p>
          <SearchForm />
        </section>

        <section className={styles.tourSection}>
          <h2>همه تور‌ها</h2>
          <div className={styles.tourGrid}>
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>
        <section className={styles.callSection}>
          <CallBanner />
        </section>
        <section className={styles.whyUs}>
          <WhyUs />
        </section>
      </div>
    </main>
  );
}

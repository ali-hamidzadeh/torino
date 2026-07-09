import { getTours } from "@/services/tourService";
import TourCard from "@/components/shared/MainPage/TourCard";
import SearchForm from "@/components/shared/MainPage/SearchForm";
import Image from "next/image";

import styles from "./page.module.css";
import banner from "@public/banner.png";
import CallBanner from "@/components/shared/MainPage/callBanner";
import WhyUs from "@/components/shared/MainPage/WhyUs";

export const revalidate = 300;

export default async function Home({ searchParams }) {
  const resolvedParams = await searchParams;
  const originId = resolvedParams?.originId;
  const destinationId = resolvedParams?.destinationId;
  const startDate = resolvedParams?.startDate;

  let tours = [];

  try {
    tours = await getTours();
  } catch (error) {
    console.error("خطا:", error);
  }

  const filteredTours = tours.filter((tour) => {
    const matchOrigin = originId
      ? String(tour.origin?.id) === String(originId)
      : true;

    const matchDestination = destinationId
      ? String(tour.destination?.id) === String(destinationId)
      : true;

    let matchDate = true;
    if (startDate && tour.startDate) {
      const searchDateStr = new Date(startDate).toDateString();
      const tourDateStr = new Date(tour.startDate).toDateString();
      matchDate = searchDateStr === tourDateStr;
    }

    return matchOrigin && matchDestination && matchDate;
  });

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
          <h2>
            {originId || destinationId || startDate
              ? "نتایج جستجو"
              : "همه تور‌ها"}
          </h2>

          <div className={styles.tourGrid}>
            {filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))
            ) : (
              <p className={styles.noResult}>
                توری با مشخصات مورد نظر شما یافت نشد.
              </p>
            )}
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

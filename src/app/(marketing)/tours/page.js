import { getTours } from "@/services/tourService";
import TourCard from "@/components/shared/MainPage/TourCard";
import SearchForm from "@/components/shared/MainPage/SearchForm";
import CallBanner from "@/components/shared/MainPage/callBanner";
import WhyUs from "@/components/shared/MainPage/WhyUs";
import Image from "next/image";

import styles from "./page.module.css";
import banner from "@public/banner.png";

export const revalidate = 300;

export default async function ToursPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const originId = resolvedParams?.originId;
  const destinationId = resolvedParams?.destinationId;
  const startDate = resolvedParams?.startDate;

  let tours = [];

  try {
    tours = await getTours();
  } catch (error) {
    console.error("خطا در دریافت لیست تورها:", error);
  }

  let filteredTours = tours.filter((tour) => {
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
  let pageStatus = "normal";

  if (filteredTours.length === 0 && destinationId) {
    const destinationTours = tours.filter(
      (tour) => String(tour.destination?.id) === String(destinationId),
    );

    if (destinationTours.length > 0) {
      filteredTours = destinationTours;
      pageStatus = "suggestedByDestination";
    } else {
      filteredTours = tours.slice(0, 4);
      pageStatus = "globalPopular";
    }
  }

  if (filteredTours.length === 0 && tours.length > 0) {
    filteredTours = tours.slice(0, 4);
    pageStatus = "globalPopular";
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
            <span className={styles.brand}>تورینو</span> برگزار کننده بهترین
            تورهای داخلی و خارجی
          </p>
          <SearchForm />
        </section>

        <section className={styles.tourSection}>
          <h2>
            {pageStatus === "suggestedByDestination" &&
              "تورهای پیشنهادی به این مقصد"}
            {pageStatus === "globalPopular" && "محبوب‌ترین تورهای تورینو"}
            {pageStatus === "normal" &&
              (originId || destinationId || startDate
                ? "نتایج جستجو"
                : "همه تور‌ها")}
          </h2>

          {pageStatus === "suggestedByDestination" && (
            <p className={styles.suggestedNotice}>
              ⚠️ توری در تاریخ یا مبدأ مورد نظر شما یافت نشد؛ اما تورهای زیر به
              همین مقصد در دسترس هستند:
            </p>
          )}

          {pageStatus === "globalPopular" && (
            <p className={styles.globalNotice}>
              متأسفانه در حال حاضر توری برای مقصد انتخابی شما تعریف نشده است.
              پیشنهاد می‌کنیم از تورهای پرطرفدار زیر دیدن کنید:
            </p>
          )}

          <div className={styles.tourGrid}>
            {filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))
            ) : (
              <p className={styles.noResult}>
                در حال حاضر هیچ توری در سیستم ثبت نشده است.
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

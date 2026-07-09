import Image from "next/image";

import TourBadges from "@/components/shared/TourDetails/TourBadges";
import TourDetailInfo from "@/components/shared/TourDetails/TourDetailInfo";
import TourPrice from "@/components/shared/TourDetails/TourPrice";
import { getTourById } from "@/services/tourService";
import { getTourDays } from "@/lib/tourUtils";

import styles from "./page.module.css";

export const revalidate = 300;

export default async function TourDetail({ params }) {
  const { id } = await params;
  const tour = await getTourById(id);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cardContainer}>
        <div className={styles.mainSection}>
          <div className={styles.image}>
            <Image
              src={tour.image}
              alt={tour.title}
              width={397}
              height={265}
              priority
            />
          </div>

          <div className={styles.contentLeft}>
            <div className={styles.titleRow}>
              <h2 className={styles.title}>{tour.title}</h2>
              <span className={styles.duration}>
                {getTourDays(tour.startDate, tour.endDate).toLocaleString(
                  "fa-IR",
                )}{" "}
                روز و{" "}
                {(getTourDays(tour.startDate, tour.endDate) - 1).toLocaleString(
                  "fa-IR",
                )}{" "}
                شب
              </span>
            </div>

            <TourBadges />

            <div className={styles.mobileDetailInfo}>
              <TourDetailInfo tour={tour} />
            </div>

            <TourPrice price={tour.price} tourId={id} />
          </div>
        </div>

        <div className={styles.desktopDetailInfo}>
          <TourDetailInfo tour={tour} />
        </div>
      </div>
    </div>
  );
}

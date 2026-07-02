"use client";

import Link from "next/link";
import styles from "./TourCard.module.css";
import Image from "next/image";
import {
  getMonthName,
  getTourDays,
  translateVehicle,
  getHotel,
} from "@/lib/tourUtils";
import { useRouter } from "next/navigation";

export default function TourCard({ tour }) {
  const month = getMonthName(tour.startDate);
  const days = getTourDays(tour.startDate, tour.endDate);
  const vehicle = translateVehicle(tour.fleetVehicle);
  const hotel = getHotel(tour.options);
  const router = useRouter();

  const handleReserve = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/booking/${tour.id}`);
  };

  return (
    <Link href={`/tours/${tour.id}`} className={styles.card}>
      <div className={styles.imageBox}>
        <Image src={tour.image} alt={tour.title} width={278.44} height={159} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{tour.title}</h3>
        <p className={styles.details}>
          {month} ماه . {days} روزه - {vehicle}
          {hotel ? ` - ${hotel}` : ""}
        </p>
        <div className={styles.reservation}>
          <button className={styles.reserveButton} onClick={handleReserve}>
            رزرو
          </button>
          <div className={styles.priceBox}>
            <span className={styles.priceAmount}>
              {(tour.price * 1000)?.toLocaleString("fa-IR")}
            </span>
            <span className={styles.priceCurrency}>تومان</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

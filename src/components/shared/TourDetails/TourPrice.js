import styles from "./TourPrice.module.css";
import Link from "next/link";

export default function TourPrice({ price, tourId }) {
  return (
    <div className={styles.priceContainer}>
      <span className={styles.priceNumber}>
        {(price * 1000).toLocaleString("fa-IR")}
      </span>
      <span className={styles.priceUnit}>تومان</span>
      <Link href={`/booking/${tourId}`} className={styles.bookButton}>
        رزرو و خرید
      </Link>
    </div>
  );
}
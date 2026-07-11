import { Suspense } from "react";
import styles from "./page.module.css";
import BookingSuccessContent from "@/components/shared/Profile/BookingSuccessContent.js";

export default function BookingSuccessPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div className={styles.card}>در حال بارگذاری…</div>}>
        <BookingSuccessContent />
      </Suspense>
    </div>
  );
}

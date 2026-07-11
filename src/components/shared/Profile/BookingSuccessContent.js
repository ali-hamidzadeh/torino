"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./BookingSuccessContent.module.css";

export default function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const tourTitle = searchParams.get("tourTitle");
  const price = searchParams.get("price");

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="64"
          height="64"
          fill="none"
          stroke="#28a745"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M7 12l3 3 7-7" />
        </svg>
      </div>

      <h1 className={styles.title}>رزرو با موفقیت انجام شد!</h1>
      <p className={styles.subtitle}>
        تور شما با موفقیت ثبت شد. جزئیات رزرو به شما ارسال خواهد شد.
      </p>

      <div className={styles.details}>
        {tourTitle && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>نام تور</span>
            <span className={styles.detailValue}>{tourTitle}</span>
          </div>
        )}

        {orderId && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>کد پیگیری</span>
            <span className={styles.detailValue}>{orderId}</span>
          </div>
        )}

        {price && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>مبلغ پرداخت شده</span>
            <span className={styles.detailValue}>
              {(price * 1000).toLocaleString("fa-IR")} تومان
            </span>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Link href="/profile/tours" className={styles.primaryBtn}>
          مشاهده در تورهای من
        </Link>
        <Link href="/" className={styles.secondaryBtn}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

import styles from "./EmptyState.module.css";

export default function EmptyState({ message, showButton = true }) {
  return (
    <div className={styles.empty}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="64"
        height="64"
        fill="none"
        stroke="#d0d0d0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>

      <p className={styles.message}>{message}</p>

      {showButton && (
        <Link href="/" className={styles.btn}>
          مشاهده تورها
        </Link>
      )}
    </div>
  );
}
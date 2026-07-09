import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import styles from "./CallBanner.module.css";
import call from "@public/professional-cartoon.png";
import Link from "next/link";

export default function CallBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.rightBox}>
        <div className={styles.textBox}>
          <h2>
            خرید تلفنی از <span className={styles.brand}>تورینو</span>
          </h2>
          <p>به هرجا که میخواهید!</p>
        </div>
        <div>
          <Image src={call} alt="call" width={308} height={225} />
        </div>
      </div>

      <div className={styles.leftBox}>
        <p className={styles.phone}>
          <span>۰۲۱-۱۸۴۰</span>
          <FaPhoneAlt />
        </p>
        <Link href="/contact" className={styles.detailsBtn}>
          اطلاعات بیشتر
        </Link>
      </div>
    </div>
  );
}

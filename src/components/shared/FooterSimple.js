import Image from "next/image";
import Link from "next/link";

import image from "@public/Torino (4) 1.png";
import airs from "@public/aira-682b7c43.png";
import saman from "@public/samandehi-6e2b448a.png";
import econ from "@public/ecunion-35c3c933.png";
import passenger from "@public/passenger-rights-48368f81 1.png";
import airline from "@public/state-airline-f45c55b2 1.png";

import styles from "./FooterSimple.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mainRowWrapper}>
        <div className={styles.mainRow}>
          <div className={styles.linksGroup}>
            <div className={styles.linksColumn}>
              <h4>تورینو</h4>
              <Link href="/about">درباره ما</Link>
              <Link href="/contact">تماس با ما</Link>
              <Link href="/torino-why">چرا تورینو</Link>
              <Link href="/insurance">بیمه مسافرتی</Link>
            </div>
            <div className={styles.linksColumn}>
              <h4>خدمات مشتریان</h4>
              <Link href="/help/support">پشتیبانی آنلاین</Link>
              <Link href="/help/purchase-guide">راهنمای خرید</Link>
              <Link href="/help/refund-guide">راهنمای استرداد</Link>
              <Link href="/help/faq">پرسش و پاسخ</Link>
            </div>
          </div>
          <div className={styles.brandColumn}>
            <Image src={image} alt="torino logo" width={146} height={44} />
            <div className={styles.supportPhone}>
              <span>تلفن پشتیبانی:</span>
              <span className={styles.phoneNumber}>۰۲۱-۸۵۷۴</span>
            </div>
            <div className={styles.trustBadges}>
              <Image src={airline} alt="نماد اعتماد ۴" width={68} height={74} />

              <Image
                src={passenger}
                alt="نماد اعتماد ۲"
                width={68}
                height={74}
              />
              <Image src={econ} alt="نماد اعتماد ۳" width={68} height={74} />
              <Image src={saman} alt="نماد اعتماد ۴" width={68} height={74} />
              <Image src={airs} alt="نماد اعتماد ۱" width={68} height={74} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>کلیه حقوق این وب سایت متعلق به سایت تورینو می‌باشد.</p>
      </div>
    </footer>
  );
}

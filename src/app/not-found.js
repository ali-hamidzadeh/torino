import Link from "next/link";
import Image from "next/image";
import FooterSimple from "@/components/shared/FooterSimple";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h1 className={styles.title}>صفحه مورد نظر یافت نشد!</h1>
          <Link href="/" className={styles.button}>
            بازگشت به صفحه اصلی
          </Link>
        </div>
        <Image
          src="/Error TV.png"
          alt="notfound"
          width={555}
          height={555}
          loading="eager"
          priority
        />
      </div>
      <FooterSimple />
    </>
  );
}

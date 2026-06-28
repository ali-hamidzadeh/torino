"use client";

import Image from "next/image";
import FooterSimple from "@/components/shared/FooterSimple";
import styles from "./error.module.css";

export default function Error() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h1 className={styles.title}>اتصال با سرور برقرار نیست!</h1>
          <p className={styles.description}>لطفا بعدا دوباره امتحان کنید.</p>
        </div>
        <Image
          src="/Error Lamp Robot.png"
          alt="server-error"
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

import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

import styles from "./Header.module.css";
import image from "@public/Torino (4) 1.png";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Image src={image} alt="torino logo" width={146} height={44} />
          <nav className={styles.navLinks}>
            <Link href="/">صفحه اصلی</Link>
            <Link href="/tours">خدمات گردشگری</Link>
            <Link href="/about">درباره ما</Link>
            <Link href="/contact">تماس با ما</Link>
          </nav>
        </div>

        <div>
          <button className={styles.header_btn}>
            <FaUser />
            <span>ورود | ثبت نام</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

"use client";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { toPersianNumber } from "@/lib/utils";

import styles from "./Header.module.css";
import image from "@public/Torino (4) 1.png";
import { FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { RxExit } from "react-icons/rx";

function Header() {
  const { isLoggedIn, user, openLoginModal, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

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
          {isLoggedIn ? (
            <div className={styles.userBox}>
              <button
                className={styles.userButton}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className={styles.userIcon}>
                  <FaUser size={24} />
                </div>
                <span>{toPersianNumber(user?.mobile) || "حساب کاربری"}</span>
                <span>{showDropdown ? "▲" : "▼"}</span>
              </button>

              {showDropdown && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.userIcon1}>
                      <FaUser size={16} />
                    </div>
                    <span>{toPersianNumber(user?.mobile)}</span>
                  </div>
                  <Link
                    href="/profile"
                    className={styles.dropdownItem}
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className={styles.userIcon2}>
                      <CiUser size={20} />
                    </div>

                    <span>اطلاعات حساب کاربری</span>
                  </Link>
                  <button
                    className={styles.dropdownLogout}
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                  >
                    <div className={styles.userIcon3}>
                      <RxExit size={20}/>
                    </div>

                    <span>خروج از حساب کاربری</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className={styles.header_button} onClick={openLoginModal}>
              <FaUser />
              <span>ورود | ثبت نام</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

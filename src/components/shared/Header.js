"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import image from "@public/Torino (4) 1.png";
import { FaUser } from "react-icons/fa";
import UserDropdown from "./UserDropdown";
import styles from "./Header.module.css";

function Header() {
  const { isLoggedIn, openLoginModal } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const pathname = usePathname();

  const LoginButtonDesktop = (
    <button className={styles.header_button} onClick={openLoginModal}>
      <FaUser />
      <span>ورود | ثبت نام</span>
    </button>
  );
  const LoginButtonMobile = (
    <button className={styles.mobileLoginButton} onClick={openLoginModal}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.6799 14.62L14.2399 12.06L11.6799 9.5"
            stroke="#28A745"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12.0601H14.17"
            stroke="#28A745"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"
            stroke="#28A745"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Image src={image} alt="torino logo" width={146} height={44} />
          <nav className={styles.navLinks}>
            <Link
              href="/"
              className={pathname === "/" ? styles.activeLink : ""}
            >
              صفحه اصلی
            </Link>
            <Link
              href="/tours"
              className={pathname === "/tours" ? styles.activeLink : ""}
            >
              خدمات گردشگری
            </Link>
            <Link
              href="/about"
              className={pathname === "/about" ? styles.activeLink : ""}
            >
              درباره ما
            </Link>
            <Link
              href="/contact"
              className={pathname === "/contact" ? styles.activeLink : ""}
            >
              تماس با ما
            </Link>
          </nav>
        </div>

        <div className={styles.mobileNavbar}>
          <button
            className={styles.hamburMenu}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5L20 5"></path>
              <path d="M4 12L20 12"></path>
              <path d="M4 19L20 19"></path>
            </svg>
          </button>

          {isLoggedIn ? (
            <UserDropdown
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            />
          ) : (
            LoginButtonMobile
          )}

          {showMobileMenu && (
            <>
              <div
                className={styles.mobileOverlay}
                onClick={() => setShowMobileMenu(false)}
              />
              <div className={styles.mobileMenu}>
                <Link
                  href="/"
                  onClick={() => setShowMobileMenu(false)}
                  className={pathname === "/" ? styles.activeLink : ""}
                >
                  <div className={styles.hamburIcon1}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill={pathname === "/" ? "#28A745" : "#282828"}
                    >
                      <path
                        d="M13.36 4.54667L9.51999 1.86C8.47333 1.12667 6.86666 1.16667 5.85999 1.94667L2.51999 4.55333C1.85333 5.07333 1.32666 6.14 1.32666 6.98V11.58C1.32666 13.28 2.70666 14.6667 4.40666 14.6667H11.5933C13.2933 14.6667 14.6733 13.2867 14.6733 11.5867V7.06667C14.6733 6.16667 14.0933 5.06 13.36 4.54667ZM8.49999 12C8.49999 12.2733 8.27333 12.5 7.99999 12.5C7.72666 12.5 7.49999 12.2733 7.49999 12V10C7.49999 9.72667 7.72666 9.5 7.99999 9.5C8.27333 9.5 8.49999 9.72667 8.49999 10V12Z"
                        fill="#28A745"
                      />
                    </svg>
                  </div>
                  صفحه اصلی
                </Link>
                <Link
                  href="/tours"
                  onClick={() => setShowMobileMenu(false)}
                  className={pathname === "/tours" ? styles.activeLink : ""}
                >
                  <div className={styles.hamburIcon1}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6.57326 12.6667L7.69327 11.72C7.85993 11.58 8.13993 11.58 8.31327 11.72L9.4266 12.6667C9.6866 12.8 10.0066 12.6667 10.0999 12.3867L10.3133 11.7467C10.3666 11.5934 10.3133 11.3667 10.1999 11.2534L9.1066 10.1534C9.0266 10.0734 8.9666 9.92003 8.9666 9.81337V8.58003C8.9666 8.30003 9.17326 8.1667 9.43326 8.27337L11.6666 9.23337C12.0333 9.39337 12.3399 9.19337 12.3399 8.79337V8.17337C12.3399 7.85337 12.0999 7.48003 11.7999 7.35337L9.17326 6.22003C9.05993 6.17337 8.97327 6.03337 8.97327 5.91337V4.53337C8.97327 4.08003 8.63993 3.5467 8.23993 3.34003C8.09326 3.2667 7.9266 3.2667 7.77993 3.34003C7.37327 3.54003 7.0466 4.08003 7.0466 4.53337V5.91337C7.0466 6.03337 6.95327 6.17337 6.8466 6.22003L4.21993 7.35337C3.9266 7.48003 3.67993 7.85337 3.67993 8.17337V8.79337C3.67993 9.19337 3.97993 9.39337 4.35327 9.23337L6.5866 8.27337C6.83993 8.16003 7.05327 8.30003 7.05327 8.58003V9.81337C7.05327 9.9267 6.9866 10.08 6.91327 10.1534L5.79993 11.2467C5.6866 11.36 5.63326 11.5867 5.6866 11.74L5.89993 12.38C5.99327 12.6667 6.3066 12.8 6.57326 12.6667Z"
                        stroke={pathname === "/tours" ? "#28A745" : "#282828"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.99992 14.6667H9.99992C13.3333 14.6667 14.6666 13.3334 14.6666 10V6.00004C14.6666 2.66671 13.3333 1.33337 9.99992 1.33337H5.99992C2.66659 1.33337 1.33325 2.66671 1.33325 6.00004V10C1.33325 13.3334 2.66659 14.6667 5.99992 14.6667Z"
                        stroke={pathname === "/tours" ? "#28A745" : "#282828"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  خدمات گردشگری
                </Link>
                <Link
                  href="/about"
                  onClick={() => setShowMobileMenu(false)}
                  className={pathname === "/about" ? styles.activeLink : ""}
                >
                  <div className={styles.hamburIcon1}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M2.21997 6.66661V9.33327C2.21997 10.6666 2.88664 11.3333 4.21997 11.3333H5.1733C5.41997 11.3333 5.66664 11.4066 5.87997 11.5333L7.82664 12.7533C9.50664 13.8066 10.8866 13.0399 10.8866 11.0599V4.93994C10.8866 2.95327 9.50664 2.19327 7.82664 3.24661L5.87997 4.46661C5.66664 4.59327 5.41997 4.66661 5.1733 4.66661H4.21997C2.88664 4.66661 2.21997 5.33327 2.21997 6.66661Z"
                        stroke={pathname === "/about" ? "#28A745" : "#171717"}
                      />
                      <path
                        d="M12.8867 5.33337C14.0734 6.91337 14.0734 9.08671 12.8867 10.6667"
                        stroke={pathname === "/about" ? "#28A745" : "#171717"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  درباره ما
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setShowMobileMenu(false)}
                  className={pathname === "/contact" ? styles.activeLink : ""}
                >
                  <div className={styles.hamburIcon1}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14.6466 12.22C14.6466 12.46 14.5933 12.7067 14.4799 12.9467C14.3666 13.1867 14.2199 13.4134 14.0266 13.6267C13.6999 13.9867 13.3399 14.2467 12.9333 14.4134C12.5333 14.58 12.0999 14.6667 11.6333 14.6667C10.9533 14.6667 10.2266 14.5067 9.45992 14.18C8.69325 13.8534 7.92658 13.4134 7.16658 12.86C6.39992 12.3 5.67325 11.68 4.97992 10.9934C4.29325 10.3 3.67325 9.57337 3.11992 8.81337C2.57325 8.05337 2.13325 7.29337 1.81325 6.54004C1.49325 5.78004 1.33325 5.05337 1.33325 4.36004C1.33325 3.90671 1.41325 3.47337 1.57325 3.07337C1.73325 2.66671 1.98659 2.29337 2.33992 1.96004C2.76659 1.54004 3.23325 1.33337 3.72659 1.33337C3.91325 1.33337 4.09992 1.37337 4.26659 1.45337C4.43992 1.53337 4.59325 1.65337 4.71325 1.82671L6.25992 4.00671C6.37992 4.17337 6.46658 4.32671 6.52658 4.47337C6.58658 4.61337 6.61992 4.75337 6.61992 4.88004C6.61992 5.04004 6.57325 5.20004 6.47992 5.35337C6.39325 5.50671 6.26658 5.66671 6.10658 5.82671L5.59992 6.35337C5.52658 6.42671 5.49325 6.51337 5.49325 6.62004C5.49325 6.67337 5.49992 6.72004 5.51325 6.77337C5.53325 6.82671 5.55325 6.86671 5.56659 6.90671C5.68659 7.12671 5.89325 7.41337 6.18658 7.76004C6.48658 8.10671 6.80658 8.46004 7.15325 8.81337C7.51325 9.16671 7.85992 9.49337 8.21325 9.79337C8.55992 10.0867 8.84658 10.2867 9.07325 10.4067C9.10658 10.42 9.14658 10.44 9.19325 10.46C9.24658 10.48 9.29992 10.4867 9.35992 10.4867C9.47325 10.4867 9.55992 10.4467 9.63325 10.3734L10.1399 9.87337C10.3066 9.70671 10.4666 9.58004 10.6199 9.50004C10.7733 9.40671 10.9266 9.36004 11.0933 9.36004C11.2199 9.36004 11.3533 9.38671 11.4999 9.44671C11.6466 9.50671 11.7999 9.59337 11.9666 9.70671L14.1733 11.2734C14.3466 11.3934 14.4666 11.5334 14.5399 11.7C14.6066 11.8667 14.6466 12.0334 14.6466 12.22Z"
                        stroke={pathname === "/contact" ? "#28A745" : "#282828"}
                        strokeMiterlimit="10"
                      />
                    </svg>
                  </div>
                  تماس با ما
                </Link>
              </div>
            </>
          )}
        </div>

        <div className={styles.desktopAuth}>
          {isLoggedIn ? (
            <UserDropdown
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            />
          ) : (
            LoginButtonDesktop
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useAuthStore } from "@/store/authStore";
import { toPersianNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";

import styles from "./Header.module.css";

export default function UserDropdown({ showDropdown, setShowDropdown }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <div className={styles.userBox}>
      <button
        className={styles.userButton}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className={styles.userIcon}>
          <FaUser size={20} />
        </div>
        <span>{toPersianNumber(user?.mobile) || "حساب کاربری"}</span>
        <span>
          {showDropdown ? (
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
              <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"></path>
            </svg>
          ) : (
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
              <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"></path>
            </svg>
          )}
        </span>
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
            onClick={async () => {
              await logout();
              setShowDropdown(false);
              router.push("/")
            }}
          >
            <div className={styles.userIcon3}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11.9474 21C7.00589 21 3 16.9706 3 12C3 7.02944 7.00589 3 11.9474 3"></path>
                <path d="M17 8C17 8 21 10.946 21 12C21 13.0541 17 16 17 16M20.5 12H9"></path>
              </svg>
            </div>
            <span>خروج از حساب کاربری</span>
          </button>
        </div>
      )}
    </div>
  );
}

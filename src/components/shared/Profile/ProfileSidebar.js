"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import styles from "./ProfileSidebar.module.css";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const links = [
    { href: "/profile", label: "پروفایل" },
    { href: "/profile/tours", label: "تور های من" },
    { href: "/profile/transactions", label: "تراکنش ها" },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {links.map((link) => (
          <li
            key={link.href}
            className={
              pathname === link.href
                ? styles.sidebarItemActive
                : styles.sidebarItem
            }
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

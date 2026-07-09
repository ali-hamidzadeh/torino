"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import styles from "./ProfileSidebar.module.css";
import user from "@/components/icons/booking/profile.png";
import convert from "@/components/icons/booking/convert-card.png";
import sun from "@/components/icons/profile/sun-fog.png";

export default function ProfileSidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/profile",
      label: "پروفایل",
      icon: <Image src={user} alt="user" width={20} height={20} />,
    },
    {
      href: "/profile/tours",
      label: "تور های من",
      icon: <Image src={sun} alt="sun" width={20} height={20} />,
    },
    {
      href: "/profile/transactions",
      label: "تراکنش ها",
      icon: <Image src={convert} alt="convert" width={20} height={20} />,
    },
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
            <Link href={link.href}>
              <span className={styles.icon}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

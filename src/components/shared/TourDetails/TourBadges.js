import Image from "next/image";

import styles from "./TourBadges.module.css";
import prof from "@/components/icons/detailPage/user-tick.png"
import map from "@/components/icons/detailPage/map.png"
import star from "@/components/icons/detailPage/medal-star.png"


export default function TourBadges() {
  return (
    <div className={styles.badgesRow}>
      <div className={styles.badgeItem}>
        <Image src={prof} alt="profile" width={24} height={24} />
        <span>تورلیدر از مبدا</span>
      </div>
      <div className={styles.badgeItem}>
        <Image src={map} alt="map" width={24} height={24} />
        <span>برنامه سفر</span>
      </div>
      <div className={styles.badgeItem}>
        <Image src={star} alt="medal-star" width={24} height={24} />
        <span>تضمین کیفیت</span>
      </div>
    </div>
  );
}
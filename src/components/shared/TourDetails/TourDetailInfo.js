import Image from "next/image";
import { translateVehicle, translateCity } from "@/lib/tourUtils";

import styles from "./TourDetailInfo.module.css";
import rout from "@/components/icons/detailPage/routing-2.png";
import calendar from "@/components/icons/detailPage/calendar.png";
import calendar_2 from "@/components/icons/detailPage/calendar-2.png";
import bus from "@/components/icons/detailPage/bus.png";
import profileuser from "@/components/icons/detailPage/profile-2user.png";
import security from "@/components/icons/detailPage/security.png";

export default function TourDetailInfo({ tour }) {
  return (
    <div className={styles.detailsFooter}>
      <div className={styles.detailColumn}>
        <div className={styles.icons}>
          <Image src={rout} alt="rout" width={24} height={24} />
          <span className={styles.detailLabel}>مبدا</span>
        </div>

        <span className={styles.detailValue}>
          {translateCity(tour.origin.name)}
        </span>
      </div>

      <div className={styles.detailColumn}>
        <div className={styles.icons}>
          <Image src={calendar} alt="calender" width={24} height={24} />
          <span className={styles.detailLabel}>تاریخ رفت</span>
        </div>
        <span className={styles.detailValue}>
          {new Date(tour.startDate).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div className={styles.detailColumn}>
        <div className={styles.icons}>
          <Image src={calendar_2} alt="calendar_2" width={24} height={24} />
          <span className={styles.detailLabel}>تاریخ برگشت</span>
        </div>
        <span className={styles.detailValue}>
          {new Date(tour.endDate).toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div className={styles.detailColumn}>
        <div className={styles.icons}>
          <Image src={bus} alt="bus" width={24} height={24} />
          <span className={styles.detailLabel}>حمل و نقل</span>
        </div>
        <span className={styles.detailValue}>
          {translateVehicle(tour.fleetVehicle)}
        </span>
      </div>

      <div className={styles.detailColumn}>
        <div className={styles.icons}>
          <Image src={profileuser} alt="profileuser" width={24} height={24} />
          <span className={styles.detailLabel}>ظرفیت</span>
        </div>
        <span className={styles.detailValue}>
          {`حداکثر ${tour.availableSeats.toLocaleString("fa-IR")} نفر`}
        </span>
      </div>

      <div className={styles.detailColumn}>
        <div className={styles.icons}>
          <Image src={security} alt="security" width={24} height={24} />
          <span className={styles.detailLabel}>بیمه</span>
        </div>
        <span className={styles.detailValue}>
          {tour.insurance ? "دارد" : "ندارد"}
        </span>
      </div>
    </div>
  );
}

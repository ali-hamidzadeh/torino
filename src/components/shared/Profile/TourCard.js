import Image from "next/image";
import {
  translateCity,
  translateStatus,
  translateVehicle,
} from "@/lib/tourUtils";

import styles from "./TourCard.module.css";
import sunFog from "@/components/icons/profile/sun-fog.png";
import busIcon from "@/components/icons/profile/bus.png";
import airplaneIcon from "@/components/icons/profile/airplane.png";
import trainIcon from "@/components/icons/profile/train.png";
import suvIcon from "@/components/icons/profile/suv.png";
import shipIcon from "@/components/icons/profile/ship.png";

const VEHICLE_ICONS = {
  bus: busIcon,
  airplane: airplaneIcon,
  train: trainIcon,
  suv: suvIcon,
  ship: shipIcon,
};

export default function TourCard({ tour }) {
  const vehicleKey = tour.fleetVehicle?.toLowerCase();
  const vehicleIcon = VEHICLE_ICONS[vehicleKey] || VEHICLE_ICONS.default;
  const vehicleName = translateVehicle(tour.fleetVehicle);

  return (
    <section className={styles.tourCard}>
      <div className={styles.cardHeader}>
        <div className={styles.titleWrapper}>
          <Image src={sunFog} alt="tour-icon" width={24} height={24} />
          <h3 className={styles.tourTitle}>{tour.title}</h3>
        </div>

        <div className={styles.vehicleWrapper}>
          <Image src={vehicleIcon} alt={vehicleName} width={24} height={24} />
          <span className={styles.vehicle}>سفر با {vehicleName}</span>
        </div>

        <span
          className={styles.status}
          data-status={tour.status?.toLowerCase()}
        >
          {translateStatus(tour.status)}
        </span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.route}>
          {translateCity(tour.origin?.name)} به{" "}
          {translateCity(tour.destination?.name)}
        </p>
        <p className={styles.date}>
          {`${new Date(tour.startDate).toLocaleDateString("fa-IR", { weekday: "long" })} ${new Date(tour.startDate).toLocaleDateString("fa-IR", { day: "numeric" })} ${new Date(tour.startDate).toLocaleDateString("fa-IR", { month: "long" })} ${new Date(tour.startDate).toLocaleDateString("fa-IR", { year: "numeric" })}`}
        </p>

        <p className={styles.returnDateContainer}>
          <span className={styles.returnDateLabel}>تاریخ برگشت:</span>
          <span className={styles.returnDateValue}>
            {`${new Date(tour.endDate).toLocaleDateString("fa-IR", { weekday: "long" })} ${new Date(tour.endDate).toLocaleDateString("fa-IR", { day: "numeric" })} ${new Date(tour.endDate).toLocaleDateString("fa-IR", { month: "long" })} ${new Date(tour.endDate).toLocaleDateString("fa-IR", { year: "numeric" })}`}
          </span>
        </p>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.tourId}>
          <span className={styles.label}>شماره تور:</span>
          <span className={styles.value}>{tour.id?.slice(0, 8)}</span>
        </span>
        <span className={styles.price}>
          <span className={styles.label}>مبلغ پرداخت شده:</span>
          <span className={styles.value}>
            {(tour.price * 1000).toLocaleString("fa-IR")}
          </span>
          <span className={styles.currency}>تومان</span>
        </span>
      </div>
    </section>
  );
}

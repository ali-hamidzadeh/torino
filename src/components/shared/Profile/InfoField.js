import styles from "./InfoField.module.css";

export default function InfoField({ label, value }) {
  return (
    <div className={styles.infoField}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value || "—"}</span>
    </div>
  );
}
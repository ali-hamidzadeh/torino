import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { toPersianNumber } from "@/lib/utils";

import styles from "./AccountInfoSection.module.css";

function EditIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
export default function AccountInfoSection({ profile, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = () => {
    setEmailInput(profile?.email || "");
    setIsEditing(true);
  };

  const saveEmail = async () => {
    setIsSaving(true);
    try {
      const res = await axiosInstance.put("/user/profile", {
        email: emailInput,
      });
      onUpdate(res.data);
      toast.success("ایمیل با موفقیت ذخیره شد");
      setIsEditing(false);
    } catch {
      toast.error("خطا در ذخیره ایمیل");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>اطلاعات حساب کاربری</h2>
      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <span className={styles.label}>شماره موبایل</span>
          <span className={styles.value}>
            {toPersianNumber(profile.mobile)}
          </span>
        </div>

        <div className={`${styles.infoItem} ${styles.emailItem}`}>
          <div className={styles.emailText}>
            {!isEditing && <span className={styles.label}>ایمیل</span>}
            {isEditing ? (
              <input
                type="email"
                className={styles.emailInput}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="آدرس ایمیل"
                autoFocus
              />
            ) : (
              <span className={styles.value}>{profile.email || "—"}</span>
            )}
          </div>

          {isEditing ? (
            <button
              className={styles.acceptButton}
              onClick={saveEmail}
              disabled={isSaving}
            >
              {isSaving ? "در حال ذخیره..." : "تایید"}
            </button>
          ) : (
            !profile.email && (
              <button className={styles.addButton} onClick={startEdit}>
                <EditIcon /> افزودن
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}

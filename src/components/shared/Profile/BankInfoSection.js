import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import InfoField from "./InfoField";

import styles from "./BankInfoSection.module.css";

const schema = yup.object({
  shebaNumber: yup
    .string()
    .transform((v) => (v === "" ? null : v))
    .matches(/^[0-9]{24}$/, "شماره شبا باید ۲۴ رقم باشد")
    .nullable(),
  cardNumber: yup
    .string()
    .transform((v) => (v === "" ? null : v))
    .matches(/^[0-9]{16}$/, "شماره کارت باید ۱۶ رقم باشد")
    .nullable(),
  accountNumber: yup
    .string()
    .transform((v) => (v === "" ? null : v))
    .matches(/^[0-9]+$/, "شماره حساب فقط باید شامل اعداد باشد")
    .nullable(),
});

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

export default function BankInfoSection({ profile, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const startEdit = () => {
    reset({
      shebaNumber: profile.shebaNumber || "",
      cardNumber: profile.cardNumber || "",
      accountNumber: profile.accountNumber || "",
    });
    setIsEditing(true);
  };

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.put("/user/profile", data);
      onUpdate(res.data);
      toast.success("اطلاعات بانکی با موفقیت ذخیره شد");
      setIsEditing(false);
    } catch {
      toast.error("خطا در ذخیره اطلاعات بانکی");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>اطلاعات حساب بانکی</h2>
        {!isEditing && (
          <button className={styles.editButton} onClick={startEdit}>
            <EditIcon /> ویرایش اطلاعات
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.infoGrid} ${styles.editGrid}`}>
            <div className={styles.infoField}>
              <input
                {...register("shebaNumber")}
                className={styles.input}
                placeholder="شماره شبا"
                dir="rtl"
              />
              {errors.shebaNumber && (
                <span className={styles.error}>
                  {errors.shebaNumber.message}
                </span>
              )}
            </div>
            <div className={styles.infoField}>
              <input
                {...register("cardNumber")}
                className={styles.input}
                placeholder="شماره کارت"
                dir="rtl"
              />
              {errors.cardNumber && (
                <span className={styles.error}>
                  {errors.cardNumber.message}
                </span>
              )}
            </div>
            <div className={styles.infoField}>
              <input
                {...register("accountNumber")}
                className={styles.input}
                placeholder="شماره حساب"
                dir="rtl"
              />
              {errors.accountNumber && (
                <span className={styles.error}>
                  {errors.accountNumber.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ذخیره..." : "تایید"}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
            >
              انصراف
            </button>
          </div>
        </form>
      ) : (
        <div className={`${styles.infoGrid} ${styles.viewGrid}`}>
          <InfoField label="شماره شبا" value={profile.shebaNumber} />
          <InfoField label="شماره کارت" value={profile.cardNumber} />
          <InfoField label="شماره حساب" value={profile.accountNumber} />
        </div>
      )}
    </section>
  );
}

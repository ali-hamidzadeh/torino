"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import InfoField from "./InfoField";
import { useState } from "react";
import Image from "next/image";

import styles from "./PersonalInfoSection.module.css";
import calendar from "@/components/icons/profile/calendar.png";
import { toPersianNumber } from "@/lib/utils";

const schema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .matches(/^[0-9]{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .nullable(),
  gender: yup.string().required("جنسیت الزامی است"),
  birthDate: yup
    .string()
    .required("تاریخ تولد الزامی است")
    .matches(
      /^[1-4]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      "فرمت تاریخ باید به صورت 1380/05/07 باشد",
    ),
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

export default function PersonalInfoSection({ profile, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const [isEditing, setIsEditing] = useState(false);

  const startEdit = () => {
    reset({
      fullName: profile.fullName || "",
      nationalCode: profile.nationalCode || "",
      gender: profile.gender || "male",
      birthDate: profile.birthDate || "",
    });
    setIsEditing(true);
  };

  const onSubmit = async (data) => {
    try {
      await axiosInstance.put("/user/profile", data);

      const profileRes = await axiosInstance.get("/user/profile");
      onUpdate(profileRes.data);

      toast.success("اطلاعات شخصی با موفقیت ذخیره شد");
      setIsEditing(false);
    } catch {
      toast.error("خطا در ذخیره اطلاعات شخصی");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>اطلاعات شخصی</h2>
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
                {...register("fullName")}
                className={styles.input}
                placeholder="نام و نام خانوادگی"
                dir="rtl"
              />
              {errors.fullName && (
                <span className={styles.error}>{errors.fullName.message}</span>
              )}
            </div>
            <div className={styles.infoField}>
              <input
                {...register("nationalCode")}
                className={styles.input}
                placeholder="کد ملی"
                dir="rtl"
              />
              {errors.nationalCode && (
                <span className={styles.error}>
                  {errors.nationalCode.message}
                </span>
              )}
            </div>
            <div className={styles.infoField}>
              <Image
                src={calendar}
                alt="calendar"
                width={14}
                height={14}
                className={styles.calendarIcon}
              />
              <input
                {...register("birthDate", {
                  onChange: (e) => {
                    let val = e.target.value.replace(/\D/g, "");
                    if (val.length > 4)
                      val = val.slice(0, 4) + "/" + val.slice(4);
                    if (val.length > 7)
                      val = val.slice(0, 7) + "/" + val.slice(7);
                    e.target.value = val.slice(0, 10);
                  },
                })}
                type="text"
                placeholder="تاریخ تولد"
                dir="rtl"
                className={`${styles.input} ${styles.dateInput}`}
              />
              {errors.birthDate && (
                <span className={styles.error}>{errors.birthDate.message}</span>
              )}
            </div>
            <div className={styles.infoField}>
              <label className={styles.floatingLabel}>جنسیت</label>
              <select {...register("gender")} className={styles.select}>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
              {errors.gender && (
                <span className={styles.error}>{errors.gender.message}</span>
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
          <InfoField
            label="نام و نام خانوادگی"
            value={
              profile.firstName && profile.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : profile.fullName || null
            }
          />
          <InfoField
            label="کد ملی"
            value={
              profile.nationalCode
                ? toPersianNumber(profile.nationalCode)
                : null
            }
          />

          <InfoField
            label="تاریخ تولد"
            value={
              profile.birthDate ? toPersianNumber(profile.birthDate) : null
            }
          />
          <InfoField
            label="جنسیت"
            value={
              profile.gender === "male"
                ? "مرد"
                : profile.gender === "female"
                  ? "زن"
                  : null
            }
          />
        </div>
      )}
    </section>
  );
}

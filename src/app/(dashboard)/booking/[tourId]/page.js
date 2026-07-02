"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { getTourDays } from "@/lib/tourUtils";
import styles from "./page.module.css";
import Image from "next/image";
import profile from "@/components/icons/booking/profile.png";
import calendar from "@/components/icons/booking/calendar.png";

const schema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .required("کد ملی الزامی است")
    .matches(/^[0-9]{10}$/, "کد ملی باید ۱۰ رقم باشد"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
  gender: yup.string().required("جنسیت الزامی است"),
});

export default function BookingPage() {
  const { tourId } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tour/${tourId}`,
        );
        setTour(res.data);
      } catch {
        toast.error("خطا در دریافت اطلاعات تور");
      }
    };
    fetchTour();
  }, [tourId]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/basket/${tourId}`);

      await axiosInstance.post("/order", {
        fullName: data.fullName,
        nationalCode: data.nationalCode,
        birthDate: data.birthDate,
        gender: data.gender,
      });

      toast.success("رزرو با موفقیت انجام شد!");
      router.push("/profile/tours");
    } catch {
      toast.error("خطا در ثبت رزرو. دوباره تلاش کنید");
    } finally {
      setIsLoading(false);
    }
  };

  if (!tour) return <div>در حال بارگذاری...</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainCard}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <Image src={profile} alt="profile" width={24} height={24} />
            <h2 className={styles.sectionTitle}>مشخصات مسافر</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.field}>
              <input
                {...register("fullName")}
                type="text"
                placeholder="نام و نام خانوادگی"
                className={styles.input}
              />
              {errors.fullName && (
                <span className={styles.error}>{errors.fullName.message}</span>
              )}
            </div>

            <div className={styles.field}>
              <input
                {...register("nationalCode")}
                type="text"
                placeholder="کد ملی"
                className={styles.input}
              />
              {errors.nationalCode && (
                <span className={styles.error}>
                  {errors.nationalCode.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <div className={styles.dateInputWrapper}>
                <Image
                  src={calendar}
                  alt="calendar"
                  width={16}
                  height={16}
                  className={styles.inputIcon}
                />
                <input
                  {...register("birthDate")}
                  type="text"
                  placeholder="تاریخ تولد"
                  className={styles.input}
                />
              </div>
              {errors.birthDate && (
                <span className={styles.error}>{errors.birthDate.message}</span>
              )}
            </div>

            <div className={styles.field}>
              <select
                {...register("gender")}
                className={styles.select}
                defaultValue=""
              >
                <option value="" disabled>
                  جنسیت
                </option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
              {errors.gender && (
                <span className={styles.error}>{errors.gender.message}</span>
              )}
            </div>
          </form>
        </div>

        <div className={styles.asideSection}>
          <div className={styles.tourHeader}>
            <h3 className={styles.tourTitle}>{tour.title}</h3>
            <p className={styles.tourDuration}>
              {getTourDays(tour.startDate, tour.endDate).toLocaleString("fa-IR")} روز و{" "}
              {(getTourDays(tour.startDate, tour.endDate) - 1).toLocaleString("fa-IR")} شب
            </p>
          </div>
          
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>قیمت نهایی</span>
            <div className={styles.priceContainer}>
              <strong className={styles.price}>
                {(tour.price * 1000).toLocaleString("fa-IR")}
              </strong>
              <span className={styles.priceUnit}> تومان</span>
            </div>
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {!isLoading ? "ثبت و خرید نهایی" : "در حال پردازش..."}
          </button>
        </div>
      </div>
    </div>
  );
}

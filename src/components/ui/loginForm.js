"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendOtp } from "@/services/authService";
import { toast } from "sonner";

import styles from "./LoginModal.module.css";

const schema = yup.object({
  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
});

export default function LoginForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await sendOtp(data.mobile);
      toast.success("کد تایید ارسال شد");
      onSuccess(data.mobile);
    } catch (error) {
      toast.error("خطا در ارسال کد. دوباره تلاش کنید!");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>ورود به تورینو</h2>
      <p className={styles.label}>شماره موبایل خود را وارد کنید</p>
      <input
        {...register("mobile")}
        type="phone"
        placeholder="0912***4253"
        dir="ltr"
        className={styles.input}
      />
      {errors.mobile && (
        <span className={styles.error}>{errors.mobile.message}</span>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {!isSubmitting ? "ارسال کد تایید" : "در حال ارسال ..."}
      </button>
    </form>
  );
}

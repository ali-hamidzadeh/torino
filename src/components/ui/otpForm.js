import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { OTPInput } from "input-otp";
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";
import { sendOtp, checkOtp } from "@/services/authService";

import styles from "./LoginModal.module.css";

export default function OtpForm({ mobile, onBack }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const { login } = useAuthStore();

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleResend = async () => {
    try {
      await sendOtp(mobile);
      setTimer(120);
      setOtp("");
      toast.success("کد جدید ارسال شد");
    } catch (error) {
      toast.error("خطا در ارسال مجدد کد");
    }
  };

  const handleSubmit = async () => {
    if (otp.length < 6) {
      toast.error("کد 6 رقمی را کامل وارد کنید");
      return;
    }
    setIsLoading(true);
    try {
      const data = await checkOtp(mobile, otp);
      login(data.user, data.accessToken, data.refreshToken);
      toast.success("خوش آمدید!");
    } catch (error) {
      toast.error("کد وارد شده اشتباه است");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <button onClick={onBack} className={styles.backArrow}>
        <IoIosArrowRoundBack />
      </button>
      <h2 className={styles.title}>کد تایید را وارد کنید.</h2>
      <p className={styles.otpLabel}>
        کد تایید به شماره <strong>{mobile}</strong> ارسال شد
      </p>
      <OTPInput
        maxLength={6}
        value={otp}
        onChange={setOtp}
        render={({ slots }) => (
          <div className={styles.otpSlots}>
            {slots.map((slot, i) => (
              <div
                key={i}
                className={`${styles.otpSlot} ${slot.isActive ? styles.otpSlotActive : ""}`}
              >
                {slot.char ?? ""}
              </div>
            ))}
          </div>
        )}
      />

      <div className={styles.timerBox}>
        {timer > 0 ? (
          <p className={styles.timer}>{formatTime(timer)} تا ارسال مجدد کد</p>
        ) : (
          <button onClick={handleResend} className={styles.resendButton}>
            ارسال مجدد کد
          </button>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={styles.submitButton}
      >
        {!isLoading ? "ورود به تورینو" : "در حال بررسی ..."}
      </button>
    </div>
  );
}

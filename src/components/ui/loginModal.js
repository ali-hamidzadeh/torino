"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

import styles from "./LoginModal.module.css";
import OtpForm from "./otpForm";
import LoginForm from "./loginForm";

export default function LoginModal() {
  const { showLoginModal, closeLoginModal } = useAuthStore();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (!showLoginModal) {
      setStep(1);
      setMobile("");
    }
  }, [showLoginModal]);

  if (!showLoginModal) return null;

  return (
    <div className={styles.overlay} onClick={closeLoginModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {step === 1 ? (
          <button className={styles.closeButton} onClick={closeLoginModal}>
            X
          </button>
        ) : null}

        {step === 1 ? (
          <LoginForm
            onSuccess={(mobileNumber) => {
              setMobile(mobileNumber);
              setStep(2);
            }}
          />
        ) : (
          <OtpForm mobile={mobile} onBack={() => setStep(1)} />
        )}
      </div>
    </div>
  );
}

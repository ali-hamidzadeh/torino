"use client";

import { useState, Suspense } from "react";
import { useAuthStore } from "@/store/authStore";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./LoginModal.module.css";
import OtpForm from "./otpForm";
import LoginForm from "./loginForm";

function LoginModalContent() {
  const { showLoginModal, closeLoginModal } = useAuthStore();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSafeRedirect = (url) => {
    return (
      typeof url === "string" && url.startsWith("/") && !url.startsWith("//")
    );
  };

  const handleLoginSuccess = () => {
    closeLoginModal();
    const redirect = searchParams.get("redirect");
    if (redirect && isSafeRedirect(redirect)) {
      router.push(redirect);
    } else {
      router.refresh();
    }
  };

  if (!showLoginModal) return null;

  return (
    <div className={styles.overlay} onClick={closeLoginModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {step === 1 && (
          <button className={styles.closeButton} onClick={closeLoginModal}>
            X
          </button>
        )}

        {step === 1 ? (
          <LoginForm
            onSuccess={(mobileNumber) => {
              setMobile(mobileNumber);
              setStep(2);
            }}
          />
        ) : (
          <OtpForm
            mobile={mobile}
            onBack={() => setStep(1)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default function LoginModal() {
  const showLoginModal = useAuthStore((s) => s.showLoginModal);
  if (!showLoginModal) return null;

  return (
    <Suspense fallback={null}>
      <LoginModalContent />
    </Suspense>
  );
}

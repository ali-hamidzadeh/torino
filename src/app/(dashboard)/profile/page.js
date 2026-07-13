"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import ProfileSidebar from "@/components/shared/Profile/ProfileSidebar.js";
import AccountInfoSection from "@/components/shared/Profile/AccountInfoSection.js";
import PersonalInfoSection from "@/components/shared/Profile/PersonalInfoSection.js";
import BankInfoSection from "@/components/shared/Profile/BankInfoSection.js";

import styles from "./page.module.css";

export default function ProfilePage() {
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/user/profile");
        setProfile(res.data);
      } catch {
        toast.error("خطا در دریافت اطلاعات پروفایل");
        setError(true);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = useCallback((updatedData) => {
    setProfile((prev) => ({ ...prev, ...updatedData }));
  }, []);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>خطا در دریافت اطلاعات</p>
        <button onClick={() => window.location.reload()}>تلاش مجدد</button>
      </div>
    );
  }

  if (!profile)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>در حال بارگذاری...</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <ProfileSidebar />
      <main className={styles.main}>
        <AccountInfoSection profile={profile} onUpdate={handleUpdate} />
        <PersonalInfoSection profile={profile} onUpdate={handleUpdate} />
        <BankInfoSection profile={profile} onUpdate={handleUpdate} />
      </main>
    </div>
  );
}

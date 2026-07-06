"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import ProfileSidebar from "@/components/shared/Profile/ProfileSidebar.js";
import TourCard from "@/components/shared/Profile/TourCard";
import EmptyState from "@/components/shared/Profile/EmptyState";

import styles from "./page.module.css";

export default function MyToursPage() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axiosInstance.get("/user/tours");
        setTours(res.data);
      } catch {
        toast.error("خطا در دریافت تورها");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className={styles.container}>
      <ProfileSidebar />
      <main className={styles.main}>
        {isLoading ? (
          <div className={styles.loading}>در حال بارگذاری...</div>
        ) : tours.length === 0 ? (
          <EmptyState message="هنوز هیچ توری رزرو نکرده‌اید" />
        ) : (
          <div className={styles.toursList}>
            {tours.map((tour, index) => (
              <TourCard
                key={`${tour.id}-${tour.startDate}-${index}`}
                tour={tour}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

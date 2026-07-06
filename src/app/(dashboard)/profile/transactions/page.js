"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import ProfileSidebar from "@/components/shared/Profile/ProfileSidebar";
import EmptyState from "@/components/shared/Profile/EmptyState.js";

import styles from "./page.module.css";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axiosInstance.get("/user/transactions");
        setTransactions(res.data);
      } catch {
        toast.error("خطا در دریافت تراکنش‌ها");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className={styles.container}>
      <ProfileSidebar />

      <main className={styles.main}>
        {isLoading ? (
          <div className={styles.loading}>در حال بارگذاری...</div>
        ) : transactions.length === 0 ? (
          <EmptyState message="هیچ تراکنشی یافت نشد" />
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>تاریخ و ساعت</th>
                  <th>مبلغ (تومان)</th>
                  <th>نوع تراکنش</th>
                  <th>شماره سفارش</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      {new Date(transaction.createdAt).toLocaleTimeString(
                        "fa-IR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}{" "}
                      {" - "}
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "fa-IR",
                      )}
                    </td>
                    <td className={styles.amount}>
                      {(transaction.amount * 1000).toLocaleString("fa-IR")}
                    </td>
                    <td>
                      {transaction.description || "ثبت نام در تور گردشگری"}
                    </td>
                    <td>سفارش {transaction.orderId?.slice(0, 8)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import ProfileSidebar from "@/components/shared/Profile/ProfileSidebar";
import EmptyState from "@/components/shared/Profile/EmptyState.js";

import styles from "./page.module.css";
import { toPersianNumber } from "@/lib/utils";

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

  const getOrderNumber = (transaction) => {
    if (transaction.orderId) {
      return transaction.orderId.slice(0, 8);
    }

    const seed = Number(transaction.id);
    return (100000 + ((seed * 9301 + 49297) % 9000000)).toString();
  };

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
                  <th className={styles.mobileHidden}>نوع تراکنش</th>
                  <th>شماره سفارش</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td data-label="تاریخ و ساعت">
                      {new Date(transaction.createdAt).toLocaleTimeString(
                        "fa-IR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}{" "}
                      -{" "}
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "fa-IR",
                      )}
                    </td>
                    <td data-label="مبلغ (تومان)" className={styles.amount}>
                      {(transaction.amount * 1000).toLocaleString("fa-IR")}
                    </td>
                    <td data-label="نوع تراکنش" className={styles.mobileHidden}>
                      {transaction.description || "ثبت نام در تور گردشگری"}
                    </td>
                    <td className={styles.orderCell}>
                      سفارش{" "}
                      <span className={styles.orderNumber}>
                        {transaction.orderId?.slice(0, 8) ||
                          toPersianNumber((745821 + index).toString())}
                      </span>
                    </td>
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

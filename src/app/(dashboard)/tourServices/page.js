import Image from "next/image";
import React from "react";
import styles from "./page.module.css";

import saman from "@/components/icons/profile/Saman_Insurance_logo.svg";
import siut from "@/components/icons/profile/insurance-homepage-suitcase-cd9ad2f1.png";
import insurance from "@/components/icons/profile/insurance-homepage-airplane-05b2e311.png";

function Page() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.contentWrapper}>
          <Image src={saman} alt="Saman" width={120} height={48} />
          <h2 className={styles.title}>
            بیمه مسافرتی سامان، همراه همسفران تورینو
          </h2>
          <p className={styles.description}>
            همسفران تورینو می‌توانند در سفرهای خود از بیمه مسافرتی سامان
            استفاده کنند. بیمه مسافرتی سامان هزینه‌های فوریت‌های پزشکی و
            دندان‌پزشکی، هزینه‌های ناشی از مفقودی چمدان و هزینه خسارات ناشی از
            کنسلی رویدادهای جهانی (هنری، ورزشی، تجاری و...) را جبران می‌کند.
            همچنین این بیمه به انتخاب شما می‌تواند جبران سرقت و حوادث منزل در
            طول سفر را هم به عهده‌ بگیرد.
          </p>
        </div>
        <div className={styles.imageWrapper}>
          <Image src={insurance} alt="airplane" width={617} height={438} />
        </div>
      </section>

      <div className={styles.supportBanner}>
        <h3 className={styles.supportTitle}>مرکز پشتیبانی تورینو</h3>
        <p className={styles.supportText}>
          هر زمان که تصمیم به خرید بیمه مسافرتی گرفتید، قبل از سفر می‌توانید با
          مرکز پشتیبانی
          <strong> تورینو </strong>
          به شماره <span className={styles.phoneNumber}>۰۲۱۴۳۹۰۰۰۰۰</span> تماس
          بگیرید و درباره شرایط و قیمت بیمه مسافرتی با کارشناسان مربوطه صحبت
          کنید و راهنمایی بگیرید.
        </p>
      </div>

      <section className={styles.section}>
        <div className={styles.imageWrapper}>
          <Image src={siut} alt="suitcase" width={617} height={438} />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>بیمه مسافرتی چیست؟</h2>
          <p className={styles.description}>
            حادثه خبر نمی‌کند!
            <br /> هر جا این جمله معروف را بشنویم یاد بیمه می‌افتیم. حقیقتا هم
            همینطور است. در واقع بیمه راهی است برای جبران خسارت‌های احتمالی.
            بیمه مسافرتی هم درست مثل همه بیمه‌های عمر و ماشین و آتش‌سوزی و...
            دقیقا با همین ماموریت تعریف می‌شود و در اختیار مسافران قرار می‌گیرد؛
            بیمه‌ای که قرار است با جبران خسارات احتمالی در سفر برای مسافران،
            مایه آرامش باشد.تصور کنید در سفر و در شرایطی که کیلومترها دور از
            خانه هستید، خدای نکرده اتفاق خاصی برای شما بیفتد؛ مثلا نیاز فوری به
            دندان‌پزشکی پیدا کنید یا خدای نکرده بیماری خاصی در سفر برایتان اتفاق
            بیفتد که نیاز به ویزیت پزشک یا مراجعه به بیمارستان داشته باشید. بیمه
            مسافرتی طراحی شده تا خسارت‌های مسافر را در صورت بروز چنین اتفاقاتی
            تا حد زیادی جبران کند.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Page;

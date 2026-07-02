"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./WhyUs.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import question from "@public/question.png";
import car from "@public/car.png";
import plain from "@public/plain.png";
import ancient from "@public/ancient.png";
import mountain from "@public/mountain.png";

const images = [ancient, mountain, car, plain];

export default function WhyUs() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const next = () => {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <h2 className={styles.title}>
          <span className={styles.iconWrapper}>
            <Image src={question} alt="question" width={24} height={24} />
          </span>
          چرا <span className={styles.brand}>تورینو</span>؟
        </h2>
        <h3 className={styles.slideTitle}>تور طبیعت گردی و تاریخی</h3>
        <p className={styles.description}>
          اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
          طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
          طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
          آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی
          را خریداری کنید.
        </p>
      </div>

      <div className={styles.imageBox}>
        <div className={styles.collage}>
          <Image
            src={images[(current + 3) % images.length]}
            alt="slide 3"
            width={389}
            height={479}
            className={styles.imageBehind3}
          />
          <Image
            src={images[(current + 2) % images.length]}
            alt="slide 3"
            width={389}
            height={479}
            className={styles.imageBehind2}
          />

          <Image
            src={images[(current + 1) % images.length]}
            alt="slide 2"
            width={389}
            height={479}
            className={styles.imageBehind1}
          />

          <Image
            src={images[current]}
            alt="slide 1"
            width={389}
            height={479}
            className={styles.imageMain}
          />
        </div>
        <div className={styles.controls}>
          <button
            className={styles.arrowBtn}
            onClick={next}
            disabled={current === images.length - 1}
          >
            <FaArrowRight />
          </button>

          <span className={styles.counter}>
            {(current + 1).toLocaleString("fa-IR")}/{(images.length).toLocaleString("fa-IR")}
          </span>
          <button
            className={styles.arrowBtn}
            onClick={prev}
            disabled={current === 0}
          >
            <FaArrowLeft />
          </button>
        </div>
      </div>
    </div>
  );
}

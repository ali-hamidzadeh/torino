"use client";

import { useQuery } from "@tanstack/react-query";
import { getToursClient } from "@/services/tourService";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "zaman";
import { MapPin, X } from "lucide-react";

import Image from "next/image";
import styles from "./SearchForm.module.css";
import location from "@public/location.png";
import destination from "@public/global-search.png";
import calendar from "@public/calendar.png";

export default function SearchForm() {
  const router = useRouter();

  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [date, setDate] = useState(null);

  const [showOrigins, setShowOrigins] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getToursClient(),
  });

  const origins = [
    ...new Map(tours.map((tour) => [tour.origin.id, tour.origin])).values(),
  ];
  const destinations = [
    ...new Map(
      tours.map((tour) => [tour.destination.id, tour.destination]),
    ).values(),
  ];

  const selectedOrigin = origins.find((origin) => origin.id === originId);
  const selectedDestination = destinations.find(
    (destination) => destination.id === destinationId,
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (originRef.current && !originRef.current.contains(e.target)) {
        setShowOrigins(false);
      }
      if (
        destinationRef.current &&
        !destinationRef.current.contains(e.target)
      ) {
        setShowDestinations(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (originId) params.set("originId", originId);
    if (destinationId) params.set("destinationId", destinationId);
    if (date) params.set("startDate", new Date(date).toISOString());
    router.push(`/tours?${params.toString()}`);
  };

  if (isLoading) return <div>در حال بارگذاری...</div>;

  return (
    <div className={styles.searchForm}>
      <div className={styles.field} ref={originRef}>
        <label
          className={`${styles.label} ${originId || showOrigins ? styles.active : ""}`}
        >
          {!originId && !showOrigins && (
            <Image src={location} width={20} height={20} alt="location" />
          )}
          مبدا (شهر / کشور)
        </label>
        <div
          className={styles.fieldContent}
          onClick={() => setShowOrigins(!showOrigins)}
        >
          <span className={styles.fieldValue}>
            {selectedOrigin?.name || ""}
          </span>
          {originId && (
            <button
              className={styles.clearBtn}
              onClick={(e) => {
                e.stopPropagation();
                setOriginId("");
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {showOrigins && (
          <div className={styles.dropdown}>
            {origins.map((o) => (
              <div
                key={o.id}
                className={styles.dropdownItem}
                onClick={() => {
                  setOriginId(o.id);
                  setShowOrigins(false);
                }}
              >
                <MapPin size={14} />
                <span>{o.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.field} ref={destinationRef}>
        <label
          className={`${styles.label} ${destinationId || showDestinations ? styles.active : ""}`}
        >
          {!destinationId && !showDestinations && (
            <Image src={destination} width={20} height={20} alt="location" />
          )}
          مقصد (شهر / کشور)
        </label>
        <div
          className={styles.fieldContent}
          onClick={() => setShowDestinations(!showDestinations)}
        >
          <span className={styles.fieldValue}>
            {selectedDestination?.name || ""}
          </span>
          {destinationId && (
            <button
              className={styles.clearBtn}
              onClick={(e) => {
                e.stopPropagation();
                setDestinationId("");
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {showDestinations && (
          <div className={styles.dropdown}>
            {destinations.map((d) => (
              <div
                key={d.id}
                className={styles.dropdownItem}
                onClick={() => {
                  setDestinationId(d.id);
                  setShowDestinations(false);
                }}
              >
                <MapPin size={14} />
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.field}>
        <Image src={calendar} width={20} height={20} alt="calendar" />
        <DatePicker
          onChange={(e) => setDate(e.value)}
          locale="fa"
          direction="rtl"
          accentColor="#28a745"
          round="x2"
          position="center"
          inputClass={styles.customInput}
        />
      </div>
      <button className={styles.searchButton} onClick={handleSearch}>
        جستجو
      </button>
    </div>
  );
}

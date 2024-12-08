"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { setDoc, doc, sum } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "@/components/Login";
import DailyQuote from "./DailyqQuote";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, Loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();

  function countValue() {
    let total_number_of_days = 0;
    let sum_blood = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_blood = data[year][month][day];
          total_number_of_days += 1;
          sum_blood += days_blood;
        }
      }
    }
    return {num_days: total_number_of_days, average_blood: sum_blood / total_number_of_days};
  }

  const statuses = {
    ...countValue(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
    
  };

  async function handleSetBlood(blood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = blood;

      //update the current state
      setData(newData);
      //update the global state
      setUserDataObj(newData);
      //update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: blood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.error("failed to set data: ", err.message);
    }
  }



  const bloods = {
    Little: "🩸",
    Less: "🩸🩸",
    Normal: "🩸🩸🩸",
    Lots: "🩸🩸🩸🩸",
    Sex: "😈",
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  const { currentNewUser, loading } = useAuth();

  if (loading) {
    return;
    <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3  bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className=" flex flex-col gap-1 sm:gap-2">
              <p className="font-medium text-transform: capitalize text-xs sm:text-sm truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className={"text-base sm:text-lg " + fugaz.className}>
                {statuses[status]}{status === 'num_days' ? ' days' : ''}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex flex-wrap items-stretch gap-4">
        {Object.keys(bloods).map((blood, bloodIndex) => {
          return (
            <button
              onClick={() => {
                const currentBloodValue = bloodIndex + 1;
                handleSetBlood(currentBloodValue);
              }}
              className={
                "p-4 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 flex-1"
              }
              key={bloodIndex}
            >
              <p className="text-4xl sm:test-5xl md:text-6xl">
                {bloods[blood]}
              </p>
              <p className={"text-indigo-500 " + fugaz.className}>{blood}</p>
            </button>
          );
        })}
      </div>
      <Calendar completeData={data} handleSetBlood={handleSetBlood} />
      <DailyQuote />
    </div>
  );
}

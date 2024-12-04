import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import Calendar from "./Calendar";
import Link from "next/link";


const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
export default function Hero() {
  return (
    <div className="py-4 flex flex-col gap-8 sm:gap-10">
      <h1
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">HerLuna</span>
        <span>
          {" "}
          Track Your <span className="textGradient">Flow</span>, Take Control
        </span>
      </h1>
      <p className="text-lg sm:text-lg md:text-2xl text-center w-full ">
        Create your flow record and see how you feel on{" "}
        <span className="font-semibold">every month of every year</span>
      </p>
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto ">
        <Link href={'/dashboard'}>
          <Button text="Sign Up" />
        </Link>
        <Link href={'/dashboard'}>
          <Button text="Log In" dark />
        </Link>
      </div>
      <Calendar demo />
    </div>
  );
}

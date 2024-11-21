import "./globals.css";
import { Fugaz_One, Open_Sans } from "next/font/google";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "HerLuna",
  description: "Track your daily mood every day of the year!",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>
        HerLuna
      </h1>
      <div className="flex item-center justify-between">
        PLACEHOLDER CTA || STATS
      </div>
    </header>
  );

  const footer =(
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-600 ' + fugaz.className}>Create with 💛</p>
    </footer>
  ) ;

  return (
    <html lang="en">
      <body
        className={
          "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800" +
          opensans.className
        }
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}

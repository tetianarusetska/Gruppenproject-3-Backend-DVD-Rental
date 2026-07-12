import { useState } from "react";

import CustomersDashboard from "./customer/CustomersDashboard";
import FilmDashboard from "./film/FilmDashboard";
import RentalDashboard from "./rental/RentalDashboard";
import ReportDashboard from "./report/ReportDashboard";


const menu = [
  "Kunden",
  "Filme",
  "Ausleihen",
  "Reports",
] as const;

const dashboards = {
  Kunden: <CustomersDashboard />,
  Filme: <FilmDashboard />,
  Ausleihen: <RentalDashboard />,
  Reports: <ReportDashboard />,
};

type MenuItem = keyof typeof dashboards;

export default function Dashboard() {

  const [active, setActive] = useState<MenuItem>("Kunden");

  return (
    <div className="mt-30 min-h-screen bg-(--bgColor) text-(--mainColor)">

      <header className="flex justify-center border-b border-white/10">

        <nav className="relative flex gap-10 py-6">
          {menu.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`relative pb-3 text-2xl font-['BebasNeue'] transition-all duration-300 ${active === item
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-90"
                }`}
            >
              {item}
              <span
                className={`absolute bottom-0 left-0 h-1 w-full bg-(--mainColor) transition-all duration-300 ${active === item
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                  }`}
              />
            </button>
          ))}
        </nav>
      </header>

      <main className="p-10">
        {dashboards[active]}
      </main>
    </div>
  );
}
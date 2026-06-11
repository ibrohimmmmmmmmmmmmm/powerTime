
import React, { useMemo, useState } from "react";

import {
  BatteryCharging,
  Moon,
  Radio,
  SunMedium,
  TimerReset,
  Wifi,
  Zap,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function App() {
  const {t, i18n } = useTranslation()
  const [langOpen, setLangOpen] = useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const [capacity, setCapacity] =
    useState("");

  const [voltage, setVoltage] =
    useState("");

  const [consumption, setConsumption] =
    useState("");

  const [txCurrent, setTxCurrent] =
    useState("");

  const [rxCurrent, setRxCurrent] =
    useState("");

  const [standbyCurrent, setStandbyCurrent] =
    useState("");

  const [txPercent, setTxPercent] =
    useState("");

  const [rxPercent, setRxPercent] =
    useState("");

  const [standbyPercent, setStandbyPercent] =
    useState("");
    const [menuOpen, setMenuOpen] = useState(false);

  const result = useMemo(() => {
    const cap = Number(capacity);

    const avgCurrent =
      Number(txCurrent) *
        (Number(txPercent) / 100) +
      Number(rxCurrent) *
        (Number(rxPercent) / 100) +
      Number(standbyCurrent) *
        (Number(standbyPercent) / 100);

    if (!avgCurrent || !cap)
      return null;

    const totalHours =
      cap / avgCurrent;

    const hours =
      Math.floor(totalHours);

    const minutes = Math.floor(
      (totalHours - hours) * 60
    );

    const seconds = Math.floor(
      ((((totalHours - hours) * 60) -
        minutes) *
        60)
    );

    return {
      avgCurrent:
        avgCurrent.toFixed(2),

      hours,

      minutes,

      seconds,

      totalHours:
        totalHours.toFixed(2),
    };
  }, [
    capacity,
    txCurrent,
    rxCurrent,
    standbyCurrent,
    txPercent,
    rxPercent,
    standbyPercent,
  ]);

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-500 ${
        darkMode
          ? "bg-[#020817] text-white"
          : "bg-[#edf4ff] text-black"
      }`}
    >

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          initial={{
            opacity: 0,
            scale: 0.95,
            rotate: -6,
          }}
          animate={{
            opacity: darkMode
              ? 0.22
              : 0.15,

            scale: 1,

            rotate: -6,

            y: [0, -12, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
       
        />
      </div>

      <div className="absolute top-[-250px] left-[-250px] h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-[-250px] right-[-250px] h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-3xl" />

      {/* HEADER */}
      <header
  className={`relative z-20 border-b backdrop-blur-3xl ${
    darkMode
      ? "border-white/10 bg-black/20"
      : "border-black/10 bg-white/70"
  }`}
>
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">

    {/* LEFT - BRAND */}
    <div className="flex items-center gap-3">
      <div className="rounded-2xl bg-cyan-500/10 p-3">
        <Radio className="text-cyan-400" />
      </div>

      <div className="leading-tight">
        <span className="font-black tracking-widest text-lg md:text-2xl">
          {t("moto")}
        </span>

        <p className="text-xs md:text-sm opacity-70">
          {t("subtitle")}
        </p>
      </div>
    </div>

    {/* DESKTOP CONTROLS */}
    <div className="hidden md:flex items-center gap-3">

      {/* DARK MODE */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 rounded-xl border px-3 py-2"
      >
        {darkMode ? <SunMedium size={16} /> : <Moon size={16} />}
      </button>

      {/* LANGUAGE DROPDOWN (CLICK BASED) */}
      <div className="relative">
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="px-3 py-2 rounded-xl border flex items-center gap-2"
        >
          🌐 {t("language")}
        </button>

        {langOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-black/90 border rounded-xl p-2 z-50">

            {[
              { name: "English", flag: "🇬🇧", code: "en" },
              { name: "Russian", flag: "🇷🇺", code: "ru" },
              { name: "Tajik", flag: "🇹🇯", code: "tj" },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  i18n.changeLanguage(l.code);
                  setLangOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2 rounded hover:bg-white/10 transition"
              >
                <span>{l.flag}</span>
                <span>{l.name}</span>
              </button>
            ))}

          </div>
        )}
      </div>
    </div>

    {/* MOBILE BUTTON */}
    <button
      className="md:hidden"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <X /> : <Menu />}
    </button>
  </div>

  {/* MOBILE MENU */}
  <AnimatePresence>
    {menuOpen && (
      <div className="fixed inset-0 z-[9999]">

        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70"
          onClick={() => setMenuOpen(false)}
        />

        {/* DRAWER */}
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.28 }}
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[380px] flex flex-col shadow-2xl border-l ${
            darkMode
              ? "bg-[#0b0b0f] text-white border-[#1f1f24]"
              : "bg-white text-black border-[#e5e7eb]"
          }`}
        >

          {/* TOP */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <h2 className="font-bold text-lg">{t("panel")}</h2>

            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-white/10"
            >
              <X size={22} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 flex flex-col gap-3 p-5">

            {/* THEME */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition"
            >
              {darkMode
                ? <SunMedium size={20} className="text-amber-400" />
                : <Moon size={20} className="text-blue-500" />
              }
              <span className="font-semibold">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {/* LANGUAGE (MOBILE) */}
            <div className="mt-4">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="px-3 py-2 rounded-xl border flex items-center gap-2"
              >
                🌐 {t("language")}
              </button>

              {langOpen && (
                <div className="mt-2 bg-black/90 border rounded-2xl p-2">

                  {[
                    { name: "English", flag: "🇬🇧", code: "en" },
                    { name: "Russian", flag: "🇷🇺", code: "ru" },
                    { name: "Tajik", flag: "🇹🇯", code: "tj" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        i18n.changeLanguage(l.code);
                        setLangOpen(false);
                      }}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/10"
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}

                </div>
              )}
            </div>
          </div>

        </motion.aside>
      </div>
    )}
  </AnimatePresence>
</header>

      {/* MAIN */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className={`grid overflow-hidden rounded-[35px] border backdrop-blur-3xl 2xl:grid-cols-2 ${
            darkMode
              ? "border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02]"
              : "border-black/10 bg-white/70"
          }`}
        >
          {/* LEFT */}
          <div className="border-r border-white/10 p-6 md:p-10">
            <div className="mb-10">
              <div className="mb-4  inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                {t("rf_system")}
              </div>

              <h2 className="text-2xl font-black md:text-5xl">
                {t("battery_parameters")}
              </h2>

              <p
                className={` text-[13px] lg:text-[18px] mt-3 text-lg ${
                  darkMode
                    ? "text-gray-400"
                    : "text-slate-700"
                }`}
              >
                {t("professional_battery_runtime_estimation")}
              </p>
            </div>

            <div className="grid gap-5  md:grid-cols-2">
              <InputField
                darkMode={darkMode}
                label="Current Consumption (mA)"
                value={consumption}
                setValue={setConsumption}
                icon={<Wifi />
                  
                }
                
              />

              <InputField
              
                darkMode={darkMode}
                label="Battery Voltage (V)"
                value={voltage}
                setValue={setVoltage}
                icon={<Zap />}
              />

              <InputField
                darkMode={darkMode}
                label="Battery Capacity (mAh)"
                value={capacity}
                setValue={setCapacity}
                icon={<BatteryCharging />}
              />

              <div className="md:col-span-2 h-[1px] bg-white/10" />

              <InputField
                darkMode={darkMode}
                label="TX Current (mA)"
                value={txCurrent}
                setValue={setTxCurrent}
              />

              <InputField
                darkMode={darkMode}
                label="RX Current (mA)"
                value={rxCurrent}
                setValue={setRxCurrent}
              />

              <InputField
                darkMode={darkMode}
                label="Standby Current (mA)"
                value={standbyCurrent}
                setValue={
                  setStandbyCurrent
                }
              />
          
              <div className="md:col-span-2 h-[1px] bg-white/10" />

              <div className="md:col-span-2">
                <p
                  className={`mb-4 text-sm font-medium ${
                    darkMode
                      ? "text-gray-300"
                      : "text-slate-700"
                  }`}
                >
                 {t("duty_cycle")}
                </p>

                <div className="grid grid-cols-3 gap-4 ">
                  <InputField
                    darkMode={darkMode}
                    label="TX %"
                    value={txPercent}
                    setValue={
                      setTxPercent
                    }
                    placeholder="0"
                  />

                  <InputField
                    darkMode={darkMode}
                    label="RX %"
                    value={rxPercent}
                    setValue={
                      setRxPercent
                    }
                    placeholder="0"
                  />

                  <InputField
                    darkMode={darkMode}
                    label="Idle %"
                    value={
                      standbyPercent
                    }
                    setValue={
                      setStandbyPercent
                    }
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-start justify-center p-6 md:p-10">
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className={`w-full max-w-[520px] rounded-[35px] border p-6 md:p-8 shadow-[0_0_60px_rgba(34,211,238,0.15)] transition-all duration-500 hover:scale-[1.01] ${
                darkMode
                  ? "border-cyan-400/20 bg-cyan-500/10"
                  : "border-cyan-300/30 bg-cyan-100/50"
              }`}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-3xl bg-cyan-500/20 p-4">
                  <TimerReset
  size={window.innerWidth < 768 ? 24 : 36}
  className="text-cyan-300"
/>
                </div>

                <div>
                  <h2 className="text-[20px] font-black md:text-4xl">
                    {t("battery_runtime")}
                  </h2>

                  <p
                    className={` text-[14px] lg:text-[16px] mt-1 ${
                      darkMode
                        ? "text-gray-400"
                        : "text-slate-700"
                    }`}
                  >
                    {t("rf_runtime_estimation")}
                  </p>
                </div>
              </div>

              {result ? (
                <>
                  <div
                    className={`mb-6 rounded-[28px] border p-6 ${
                      darkMode
                        ? "border-white/10 bg-black/20"
                        : "border-black/10 bg-white/70"
                    }`}
                  >
                    <p
                      className={`mb-2 text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-slate-700"
                      }`}
                    >
                     {t("average_current")}
                    </p>

                    <h1 className="text-4xl font-black text-cyan-300">
                      {result.avgCurrent}

                      <span className="ml-2 text-2xl">
                        mA
                      </span>
                    </h1>
                  </div>

                  <div
                    className={`rounded-[28px] border p-6 md:p-8 ${
                      darkMode
                        ? "border-white/10 bg-black/30"
                        : "border-black/10 bg-white/70"
                    }`}
                  >
                    <p
                      className={`mb-4 text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-slate-700"
                      }`}
                    >
                      {t("estimated_runtime")}
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <h1 className="text-4xl font-black text-green-400 md:text-7xl">
                          {result.hours}
                        </h1>

                        <span className="text-sm text-gray-400">
                          {t("hours")}
                        </span>
                      </div>

                      <div>
                        <h1 className="text-4xl font-black text-cyan-300 md:text-6xl">
                          {result.minutes}
                        </h1>

                        <span className="text-sm text-gray-400">
                          {t("minutes")}
                        </span>
                      </div>

                      <div>
                        <h1 className="text-4xl font-black text-blue-300 md:text-5xl">
                          {result.seconds}
                        </h1>

                        <span className="text-sm text-gray-400">
                          {t("seconds")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 h-4 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${Math.min(
                            Number(
                              result.totalHours
                            ) * 5,
                            100
                          )}%`,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400"
                      />
                    </div>

                    <p
                      className={`mt-5 text-lg ${
                        darkMode
                          ? "text-gray-400"
                          : "text-slate-700"
                      }`}
                    >
                      {t("total_runtime")}

                      <span
                        className={`ml-2 font-bold ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {result.totalHours}h
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className={`rounded-[30px] border border-dashed p-12 text-center ${
                    darkMode
                      ? "border-white/10 bg-black/20"
                      : "border-black/10 bg-white/70"
                  }`}
                >
                  <h2 className="mb-4 text-[16px] lg:text-[30px] font-black text-cyan-300">
                    {t("waiting_for_data")}
                  </h2>

                  <p
                    className={`text-[12px] lg:text-[16px] ${
                      darkMode
                        ? "text-gray-400"
                        : "text-slate-700"
                    }`}
                  >
                    {t("enter_battery_parameters")}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

type InputProps = {
  label: string;
  value: string;
  setValue: (v: string) => void;
  icon?: React.ReactNode;
  darkMode: boolean;
  placeholder?: string;
};

function InputField({
  label,
  value,
  setValue,
  icon,
  darkMode,
  placeholder,
}: InputProps) {
  return (
    <div>
      <label
        className={`mb-2 block text-sm font-medium ${
          darkMode
            ? "text-gray-300"
            : "text-slate-700"
        }`}
      >
        {label}
      </label>

      <div
        className={`group  flex items-center gap-4 rounded-[28px] border px-6 py-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] ${
          darkMode
            ? "border-white/10 bg-white/4 hover:border-cyan-400/40"
            : "border-black/10 bg-white/80 hover:border-cyan-500/40"
        }`}
      >
        {icon && (
          <div className="text-cyan-400">
            {icon}
          </div>
        )}

        <input
          type="text"
          
          inputMode="decimal"
          value={value}
          onChange={(e) =>
            setValue(
              e.target.value.replace(
                /[^0-9.]/g,
                ""
              )
            )
          }
          placeholder={
            placeholder ||
            "Enter value..."
          }
          className={`w-full bg-transparent text-sm font-semibold tracking-wide outline-none ${
            darkMode
              ? "placeholder:text-gray-500"
              : "placeholder:text-gray-400"
          }`}
        />
      </div>
    </div>
  );
}

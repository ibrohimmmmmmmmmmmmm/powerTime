
import { useMemo, useState } from "react";
import {
  BatteryCharging,
  Moon,
  Radio,
 Signal,
  SunMedium,
  TimerReset,
  Wifi,
  Zap,
} from "lucide-react";

import { motion } from "framer-motion";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [capacity, setCapacity] = useState("");
  const [voltage, setVoltage] = useState("");

  const [consumption, setConsumption] =
    useState("");

  const [txCurrent, setTxCurrent] =
    useState("");

  const [rxCurrent, setRxCurrent] =
    useState("");

  const [standbyCurrent, setStandbyCurrent] =
    useState("");

  const [txPercent, setTxPercent] =
    useState("5");

  const [rxPercent, setRxPercent] =
    useState("5");

  const [standbyPercent, setStandbyPercent] =
    useState("90");

  const result = useMemo(() => {
    const cap = Number(capacity);

    const avgCurrent =
      Number(txCurrent) *
        (Number(txPercent) / 100) +
      Number(rxCurrent) *
        (Number(rxPercent) / 100) +
      Number(standbyCurrent) *
        (Number(standbyPercent) / 100);

    if (!avgCurrent || !cap) return null;

    const totalHours = cap / avgCurrent;

    const hours = Math.floor(totalHours);

    const minutes = Math.floor(
      (totalHours - hours) * 60
    );

    const seconds = Math.floor(
      ((((totalHours - hours) * 60) -
        minutes) *
        60)
    );

    return {
      avgCurrent: avgCurrent.toFixed(2),
      hours,
      minutes,
      seconds,
      totalHours: totalHours.toFixed(2),
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
          : "bg-[#dfe7ef] text-black"
      }`}
    >
      {/* MOTOROLA BACKGROUND */}
      
      {/* GLOW */}
      <div className="absolute top-[-250px] left-[-250px] h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-[-250px] right-[-250px] h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-3xl" />

      {/* HEADER */}
      <header
        className={`relative z-20 border-b backdrop-blur-3xl ${
          darkMode
            ? "border-white/10 bg-black/20"
            : "border-black/10 bg-white/40"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                boxShadow: darkMode
                  ? [
                      "0 0 15px rgba(34,211,238,0.2)",
                      "0 0 35px rgba(34,211,238,0.6)",
                      "0 0 15px rgba(34,211,238,0.2)",
                    ]
                  : [
                      "0 0 10px rgba(34,211,238,0.1)",
                      "0 0 25px rgba(34,211,238,0.3)",
                      "0 0 10px rgba(34,211,238,0.1)",
                    ],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="rounded-3xl bg-cyan-500/10 p-4"
            >
              <Radio
                className="text-cyan-400"
                size={32}
              />
            </motion.div>

            <div>
              <h1 className="text-2xl font-black tracking-[4px] md:text-4xl">
                RADIO CALCULATOR
              </h1>

              <p
                className={`text-sm md:text-base ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                RF Engineering Runtime System
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "border-white/10 bg-white/10 hover:bg-white/20"
                : "border-black/10 bg-white/70 hover:bg-white"
            }`}
          >
            {darkMode ? (
              <>
                <SunMedium className="text-yellow-400" />
                Light
              </>
            ) : (
              <>
                <Moon className="text-cyan-500" />
                Dark
              </>
            )}
          </button>
        </div>
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
          className={`grid overflow-hidden rounded-[35px] border backdrop-blur-3xl xl:grid-cols-2 ${
            darkMode
              ? "border-white/10 bg-white/[0.03]"
              : "border-black/10 bg-white/40"
          }`}
        >
          {/* LEFT */}
          <div className="border-r border-white/10 p-6 md:p-10">
            <div className="mb-10">
              <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                RF ENGINEERING SYSTEM
              </div>

              <h2 className="text-4xl font-black md:text-5xl">
                Battery Parameters
              </h2>

              <p
                className={`mt-3 text-lg ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                Professional battery runtime
                estimation
              </p>
            </div>

            <div className="space-y-5">
              <InputField
                darkMode={darkMode}
                label="Current Consumption (mA)"
                value={consumption}
                setValue={setConsumption}
                icon={<Wifi />}
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

              <div className="h-[1px] bg-white/10" />

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
                setValue={setStandbyCurrent}
              />

              <div className="h-[1px] bg-white/10" />

              <div>
                <p
                  className={`mb-4 text-sm font-medium ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  Duty Cycle
                  (TX / RX / Idle)
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    darkMode={darkMode}
                    label="TX %"
                    value={txPercent}
                    setValue={setTxPercent}
                  />

                  <InputField
                    darkMode={darkMode}
                    label="RX %"
                    value={rxPercent}
                    setValue={setRxPercent}
                  />

                  <InputField
                    darkMode={darkMode}
                    label="Idle %"
                    value={standbyPercent}
                    setValue={
                      setStandbyPercent
                    }
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
              className={`w-full max-w-[520px] rounded-[35px] border p-8 shadow-[0_0_60px_rgba(34,211,238,0.15)] ${
                darkMode
                  ? "border-cyan-400/20 bg-cyan-500/10"
                  : "border-cyan-300/30 bg-cyan-100/40"
              }`}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-3xl bg-cyan-500/20 p-4">
                  <TimerReset
                    className="text-cyan-300"
                    size={36}
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-black md:text-4xl">
                    Battery Runtime
                  </h2>

                  <p
                    className={`mt-1 ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    RF Runtime Estimation
                  </p>
                </div>
              </div>

              {result ? (
                <>
                  <div
                    className={`mb-6 rounded-[28px] border p-6 ${
                      darkMode
                        ? "border-white/10 bg-black/20"
                        : "border-black/10 bg-white/50"
                    }`}
                  >
                    <p
                      className={`mb-2 text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      Average Current
                    </p>

                    <h1 className="text-5xl font-black text-cyan-300">
                      {result.avgCurrent}
                      <span className="ml-2 text-2xl">
                        mA
                      </span>
                    </h1>
                  </div>

                  <div
                    className={`rounded-[28px] border p-8 ${
                      darkMode
                        ? "border-white/10 bg-black/30"
                        : "border-black/10 bg-white/50"
                    }`}
                  >
                    <p
                      className={`mb-4 text-sm ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      Estimated Runtime
                    </p>

                    <div className="flex flex-wrap items-end gap-3">
                      <div>
                        <h1 className="text-7xl font-black text-green-400">
                          {result.hours}
                        </h1>

                        <span className="text-sm text-gray-400">
                          HOURS
                        </span>
                      </div>

                      <div>
                        <h1 className="text-6xl font-black text-cyan-300">
                          {result.minutes}
                        </h1>

                        <span className="text-sm text-gray-400">
                          MINUTES
                        </span>
                      </div>

                      <div>
                        <h1 className="text-5xl font-black text-blue-300">
                          {result.seconds}
                        </h1>

                        <span className="text-sm text-gray-400">
                          SECONDS
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
                          : "text-gray-600"
                      }`}
                    >
                      Total Runtime:
                      <span
                        className={`ml-2 font-bold ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {result.totalHours}
                        h
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className={`rounded-[30px] border border-dashed p-12 text-center ${
                    darkMode
                      ? "border-white/10 bg-black/20"
                      : "border-black/10 bg-white/40"
                  }`}
                >
                  <h2 className="mb-4 text-4xl font-black text-cyan-300">
                    Waiting For Data
                  </h2>

                  <p
                    className={`text-lg ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    Enter battery parameters
                    to calculate runtime
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
};

function InputField({
  label,
  value,
  setValue,
  icon,
  darkMode,
}: InputProps) {
  return (
    <div>
      <label
        className={`mb-2 block text-sm font-medium ${
          darkMode
            ? "text-gray-300"
            : "text-gray-700"
        }`}
      >
        {label}
      </label>

      <div
        className={`group flex items-center gap-4 rounded-[22px] border px-5 py-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] ${
          darkMode
            ? "border-white/10 bg-white/[0.04] hover:border-cyan-400/40"
            : "border-black/10 bg-white/60 hover:border-cyan-500/40"
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
          placeholder="Enter value..."
          className={`w-full bg-transparent text-lg outline-none ${
            darkMode
              ? "placeholder:text-gray-500"
              : "placeholder:text-gray-400"
          }`}
        />
      </div>
    </div>
  );
}

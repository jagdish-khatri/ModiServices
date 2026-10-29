"use client";

import { useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { calculateSIPFutureValue, formatIndianNumber } from "@/lib/utils";
import { Info } from "lucide-react";

const DEFAULT_MONTHLY = 5000;
const DEFAULT_RETURN = 12;
const DEFAULT_YEARS = 10;

function Slider({
  label,
  id,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
}: {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="form-label mb-0">
          {label}
        </label>
        <span className="text-sm font-bold text-navy-700">{formatValue(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-navy-700"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={formatValue(value)}
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(DEFAULT_MONTHLY);
  const [annualReturn, setAnnualReturn] = useState(DEFAULT_RETURN);
  const [years, setYears] = useState(DEFAULT_YEARS);

  const result = calculateSIPFutureValue(monthly, annualReturn, years);

  const formatINR = useCallback((v: number) => formatIndianNumber(v), []);
  const formatPct = useCallback((v: number) => `${v}% p.a.`, []);
  const formatYrs = useCallback((v: number) => `${v} yrs`, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
          <p className="font-semibold text-gray-700 mb-1">Year {label}</p>
          {payload.map((p: any) => (
            <p key={p.name} style={{ color: p.color }} className="font-medium">
              {p.name}: {formatIndianNumber(p.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section
      id="sip-calculator"
      className="section-padding bg-navy-950"
      aria-labelledby="calculator-heading"
    >
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-teal-500/20 border border-teal-400/30 px-4 py-1.5 text-sm font-semibold text-teal-300 mb-4">
            SIP Calculator
          </span>
          <h2 id="calculator-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Explore Illustrative SIP Growth
          </h2>
          <p className="text-navy-200 leading-relaxed">
            Adjust the inputs to see how a monthly SIP investment may grow over
            time. Results are illustrative only — not a guarantee of returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Controls */}
          <div className="rounded-2xl bg-navy-800/60 border border-navy-700 p-8 space-y-8">
            <Slider
              label="Monthly Investment"
              id="monthly-amount"
              min={500}
              max={100000}
              step={500}
              value={monthly}
              onChange={setMonthly}
              formatValue={(v) => formatIndianNumber(v)}
            />
            <Slider
              label="Expected Annual Return"
              id="annual-return"
              min={4}
              max={24}
              step={0.5}
              value={annualReturn}
              onChange={setAnnualReturn}
              formatValue={formatPct}
            />
            <Slider
              label="Investment Duration"
              id="duration"
              min={1}
              max={30}
              step={1}
              value={years}
              onChange={setYears}
              formatValue={formatYrs}
            />

            {/* Results */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Invested", value: formatIndianNumber(result.totalInvested), color: "text-blue-400" },
                { label: "Illustrative Value", value: formatIndianNumber(result.estimatedValue), color: "text-teal-400" },
                { label: "Illustrative Gain", value: formatIndianNumber(result.estimatedGain), color: "text-green-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-xl bg-navy-900/60 border border-navy-700 p-3 text-center">
                  <p className="text-xs text-navy-300 mb-1">{label}</p>
                  <p className={`text-base font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Calculation note */}
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-amber-200 leading-relaxed">
                Calculation uses the standard SIP future-value formula with a
                monthly compounding rate derived from the entered annual rate.
                Actual market-linked returns may differ significantly from this
                illustration. This is not personalised financial advice.
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-2xl bg-navy-800/60 border border-navy-700 p-6">
            <h3 className="text-white font-semibold mb-1">Illustrative Growth Over Time</h3>
            <p className="text-xs text-navy-300 mb-5">
              Amounts in Indian Rupees · For illustration only · Not a forecast
            </p>
            <div role="img" aria-label={`Illustrative SIP growth chart: ₹${monthly.toLocaleString("en-IN")} monthly over ${years} years at ${annualReturn}% p.a.`}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={result.yearlyData}>
                  <defs>
                    <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                  <XAxis
                    dataKey="year"
                    stroke="#94a3b8"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(v) => `Yr ${v}`}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(v) => formatIndianNumber(v)}
                    width={72}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="invested"
                    name="Amount Invested"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    fill="url(#investedGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    name="Illustrative Value"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    fill="url(#valueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

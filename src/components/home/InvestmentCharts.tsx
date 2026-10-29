"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { CSVParseResult } from "@/lib/csv-parser";
import { AlertTriangle, Database, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
  "#1d4ed8",
  "#0d9488",
  "#7c3aed",
  "#d97706",
  "#dc2626",
  "#059669",
  "#0891b2",
];

type ChartType = "line" | "bar";

function NoDataState({ error, warnings }: { error?: string; warnings?: string[] }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
      <Database className="h-12 w-12 text-gray-300 mx-auto mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">No Chart Data Available</h3>
      {error ? (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-left mb-4 max-w-xl mx-auto">
          <p className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" aria-hidden="true" />
            {error}
          </p>
        </div>
      ) : null}
      <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
        To display historical investment charts, place a CSV file in the{" "}
        <code className="font-mono text-xs bg-gray-200 px-1.5 py-0.5 rounded">data/</code> folder
        at the root of the project. See the{" "}
        <code className="font-mono text-xs bg-gray-200 px-1.5 py-0.5 rounded">.env.example</code>{" "}
        file and README for configuration details.
      </p>
      {warnings && warnings.length > 0 && (
        <details className="mt-4 text-left max-w-xl mx-auto">
          <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
            Show developer warnings ({warnings.length})
          </summary>
          <ul className="mt-2 space-y-1">
            {warnings.map((w, i) => (
              <li key={i} className="text-xs text-gray-500 font-mono bg-gray-100 rounded px-2 py-1">
                {w}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

function ChartCard({ result }: { result: CSVParseResult }) {
  const [chartType, setChartType] = useState<ChartType>("line");
  const [normalized, setNormalized] = useState(true);

  const displayColumns = normalized
    ? result.valueColumns.map((c) => `${c}_normalized`).filter((c) => result.data[0]?.[c] !== undefined)
    : result.valueColumns;

  const displayData = result.data;
  const xKey = result.dateColumn || "date";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const row = result.data.find((r) => (r[xKey] as string) === label || r.displayDate === label);
      return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs max-w-xs">
          <p className="font-semibold text-gray-700 mb-2">
            {row?.displayDate || label}
          </p>
          {payload.map((p: any) => {
            const colName = normalized
              ? p.dataKey.replace("_normalized", "")
              : p.dataKey;
            return (
              <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
                {colName}: {normalized ? `${Number(p.value).toFixed(2)} (base 100)` : Number(p.value).toLocaleString("en-IN")}
              </p>
            );
          })}
          {normalized && (
            <p className="text-gray-400 mt-1">Normalised to base 100 for comparison</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Reduce data points for performance if dataset is large
  const sampledData = displayData.length > 200
    ? displayData.filter((_, i) => i % Math.floor(displayData.length / 150) === 0)
    : displayData;

  return (
    <div className="card border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-navy-900 text-lg">{result.fileName}</h3>
          {result.dateRange && (
            <p className="text-xs text-gray-500 mt-0.5">
              Period: {result.dateRange.start} — {result.dateRange.end} · {result.rowCount} records
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Normalize toggle */}
          <button
            onClick={() => setNormalized((v) => !v)}
            className={cn(
              "text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors",
              normalized
                ? "bg-navy-700 text-white border-navy-700"
                : "bg-white text-gray-700 border-gray-300 hover:border-navy-400"
            )}
            aria-pressed={normalized}
          >
            {normalized ? "Normalized (Base 100)" : "Raw Values"}
          </button>
          {/* Chart type toggle */}
          {(["line", "bar"] as ChartType[]).map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={cn(
                "text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors capitalize",
                chartType === type
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-teal-400"
              )}
              aria-pressed={chartType === type}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <details className="mb-4">
          <summary className="flex items-center gap-1.5 text-xs text-amber-600 cursor-pointer">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            {result.warnings.length} data warning(s)
          </summary>
          <ul className="mt-2 space-y-1 pl-5">
            {result.warnings.map((w, i) => (
              <li key={i} className="text-xs text-gray-500">{w}</li>
            ))}
          </ul>
        </details>
      )}

      {/* Chart */}
      <div
        role="img"
        aria-label={`Historical investment chart from ${result.fileName}. Period: ${result.dateRange?.start || "unknown"} to ${result.dateRange?.end || "unknown"}. Shows ${displayColumns.length} data series.`}
      >
        <ResponsiveContainer width="100%" height={380}>
          {chartType === "line" ? (
            <LineChart data={sampledData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickFormatter={(v) => {
                  const row = sampledData.find((r) => r[xKey] === v);
                  return row?.displayDate?.toString() || v?.toString() || "";
                }}
                interval="preserveStartEnd"
                minTickGap={40}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickFormatter={(v) =>
                  normalized ? v.toFixed(0) : Number(v).toLocaleString("en-IN")
                }
                width={normalized ? 50 : 80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px" }} formatter={(value) => value.replace("_normalized", "")} />
              {displayColumns.map((col, i) => (
                <Line
                  key={col}
                  type="monotone"
                  dataKey={col}
                  name={col.replace("_normalized", "")}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={sampledData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickFormatter={(v) => {
                  const row = sampledData.find((r) => r[xKey] === v);
                  return row?.displayDate?.toString() || v?.toString() || "";
                }}
                interval="preserveStartEnd"
                minTickGap={40}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickFormatter={(v) =>
                  normalized ? v.toFixed(0) : Number(v).toLocaleString("en-IN")
                }
                width={normalized ? 50 : 80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px" }} formatter={(value) => value.replace("_normalized", "")} />
              {displayColumns.map((col, i) => (
                <Bar
                  key={col}
                  dataKey={col}
                  name={col.replace("_normalized", "")}
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity={0.8}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Accessible data summary */}
      <details className="mt-4">
        <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
          View data summary (accessible table)
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-xs text-gray-600">
            <caption className="sr-only">Summary of {result.fileName} data</caption>
            <thead>
              <tr className="border-b border-gray-200">
                <th scope="col" className="py-2 pr-4 text-left font-semibold">Date</th>
                {result.valueColumns.map((col) => (
                  <th key={col} scope="col" className="py-2 px-2 text-right font-semibold">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.data.slice(0, 20).map((row, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-1.5 pr-4">{row.displayDate || (row[xKey] as string)}</td>
                  {result.valueColumns.map((col) => (
                    <td key={col} className="py-1.5 px-2 text-right font-mono">
                      {typeof row[col] === "number" && !isNaN(row[col] as number)
                        ? Number(row[col]).toLocaleString("en-IN")
                        : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {result.data.length > 20 && (
            <p className="text-xs text-gray-400 mt-2">
              Showing first 20 of {result.data.length} records. Download the source CSV file for full data.
            </p>
          )}
        </div>
      </details>
    </div>
  );
}

interface Props {
  results: CSVParseResult[];
  serverError?: string;
}

export default function InvestmentCharts({ results, serverError }: Props) {
  const successfulResults = results.filter((r) => r.success);
  const failedResults = results.filter((r) => !r.success);

  if (serverError || successfulResults.length === 0) {
    return (
      <NoDataState
        error={serverError || failedResults[0]?.error}
        warnings={failedResults[0]?.warnings}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Failed files warnings */}
      {failedResults.map((r) => (
        <div
          key={r.fileName}
          className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-2"
        >
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-amber-800">
            <strong>{r.fileName}:</strong> {r.error}
          </p>
        </div>
      ))}

      {/* Successful charts */}
      {successfulResults.map((result) => (
        <ChartCard key={result.fileName} result={result} />
      ))}
    </div>
  );
}

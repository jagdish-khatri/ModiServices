import { CSVParseResult } from "@/lib/csv-parser";
import InvestmentCharts from "./InvestmentCharts";

async function getChartData(): Promise<{
  results: CSVParseResult[];
  error?: string;
}> {
  try {
    // Dynamic import to avoid bundling server-only code in client
    const { parseCSVFile, getCSVFilePaths } = await import("@/lib/csv-parser");
    const files = getCSVFilePaths();
    const results: CSVParseResult[] = [];

    for (const file of files) {
      const result = await parseCSVFile(file.filePath);
      results.push(result);
    }

    return { results };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error loading chart data.";
    console.error("[InvestmentChartsSection] Error loading CSV:", errorMessage);
    return {
      results: [],
      error: errorMessage,
    };
  }
}

export default async function InvestmentChartsSection() {
  const { results, error } = await getChartData();

  return (
    <section
      id="investment-charts"
      className="section-padding bg-white"
      aria-labelledby="charts-heading"
    >
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-tag">Historical Data</span>
          <h2 id="charts-heading" className="section-title mb-4">
            Explore Historical Investment Trends
          </h2>
          <p className="section-subtitle">
            Review historical data to understand how investment values have changed
            over time. Historical performance is informative, but it does not
            predict future returns.
          </p>
        </div>

        <InvestmentCharts results={results} serverError={error} />

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 px-6 py-4">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Data & Chart Disclaimer:</strong> Charts display historical
            data from the supplied CSV files. Figures represent past values and
            are provided for informational purposes only. Past performance does
            not guarantee or predict future investment outcomes. Normalized
            values use a common starting base of 100 to allow visual comparison
            of relative performance — they do not represent actual investment
            amounts or returns. NAV changes shown do not include the effect of
            dividends or distributions unless the source data includes them.
          </p>
        </div>
      </div>
    </section>
  );
}

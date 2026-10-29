import fs from "fs";
import path from "path";
import Papa from "papaparse";

export interface CSVRow {
  [key: string]: string;
}

export interface ChartDataPoint {
  date: string;
  displayDate: string;
  [key: string]: string | number;
}

export interface CSVParseResult {
  success: boolean;
  data: ChartDataPoint[];
  columns: string[];
  dateColumn: string | null;
  valueColumns: string[];
  rowCount: number;
  dateRange: { start: string; end: string } | null;
  error?: string;
  warnings: string[];
  fileName: string;
}

export interface CSVFileInfo {
  fileName: string;
  filePath: string;
  exists: boolean;
}

// Detect date column from column names
function detectDateColumn(columns: string[]): string | null {
  const dateKeywords = ["date", "Date", "DATE", "month", "Month", "MONTH", "period", "Period", "year", "Year"];
  return columns.find((col) => dateKeywords.some((kw) => col.toLowerCase().includes(kw.toLowerCase()))) ?? null;
}

// Detect numeric value columns
function detectValueColumns(columns: string[], dateCol: string | null): string[] {
  return columns.filter((col) => col !== dateCol);
}

// Parse a date string into a sortable date
function parseDate(dateStr: string): Date | null {
  if (!dateStr || dateStr.trim() === "") return null;
  const cleaned = dateStr.trim();

  // Try common formats
  const formats = [
    // ISO
    /^(\d{4})-(\d{2})-(\d{2})$/,
    // DD/MM/YYYY
    /^(\d{2})\/(\d{2})\/(\d{4})$/,
    // MM/DD/YYYY
    /^(\d{2})\/(\d{2})\/(\d{4})$/,
    // DD-MM-YYYY
    /^(\d{2})-(\d{2})-(\d{4})$/,
    // Month Year
    /^([A-Za-z]+)\s+(\d{4})$/,
    // YYYY
    /^(\d{4})$/,
  ];

  // Try native Date parsing
  const d = new Date(cleaned);
  if (!isNaN(d.getTime())) return d;

  // Try DD/MM/YYYY
  const ddmmyyyy = cleaned.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyy) {
    return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2].padStart(2, "0")}-${ddmmyyyy[1].padStart(2, "0")}`);
  }

  // Try DD-MM-YYYY
  const ddmmyyyy2 = cleaned.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (ddmmyyyy2) {
    return new Date(`${ddmmyyyy2[3]}-${ddmmyyyy2[2].padStart(2, "0")}-${ddmmyyyy2[1].padStart(2, "0")}`);
  }

  return null;
}

function formatDisplayDate(dateStr: string): string {
  const d = parseDate(dateStr);
  if (!d) return dateStr;
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

// Normalize values to a common starting point (100) for fair comparison
export function normalizeToBase100(data: ChartDataPoint[], columns: string[]): ChartDataPoint[] {
  if (data.length === 0) return data;

  const baseValues: { [key: string]: number } = {};
  for (const col of columns) {
    const firstValid = data.find((row) => typeof row[col] === "number" && !isNaN(row[col] as number));
    if (firstValid) {
      baseValues[col] = firstValid[col] as number;
    }
  }

  return data.map((row) => {
    const newRow: ChartDataPoint = { ...row };
    for (const col of columns) {
      if (baseValues[col] && typeof row[col] === "number" && baseValues[col] !== 0) {
        newRow[`${col}_normalized`] = (((row[col] as number) / baseValues[col]) * 100);
      }
    }
    return newRow;
  });
}

export async function parseCSVFile(filePath: string): Promise<CSVParseResult> {
  const fileName = path.basename(filePath);
  const warnings: string[] = [];

  // Check file exists
  if (!fs.existsSync(filePath)) {
    return {
      success: false,
      data: [],
      columns: [],
      dateColumn: null,
      valueColumns: [],
      rowCount: 0,
      dateRange: null,
      error: `CSV file not found: ${fileName}. Please place your CSV data file at: ${filePath}`,
      warnings,
      fileName,
    };
  }

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    return {
      success: false,
      data: [],
      columns: [],
      dateColumn: null,
      valueColumns: [],
      rowCount: 0,
      dateRange: null,
      error: `Failed to read CSV file: ${err instanceof Error ? err.message : "Unknown error"}`,
      warnings,
      fileName,
    };
  }

  if (!fileContent || fileContent.trim() === "") {
    return {
      success: false,
      data: [],
      columns: [],
      dateColumn: null,
      valueColumns: [],
      rowCount: 0,
      dateRange: null,
      error: `CSV file is empty: ${fileName}`,
      warnings,
      fileName,
    };
  }

  // Parse CSV
  const parseResult = Papa.parse<CSVRow>(fileContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false, // We'll handle type conversion ourselves
  });

  if (parseResult.errors.length > 0) {
    const errorMessages = parseResult.errors.slice(0, 5).map((e) => `Row ${e.row}: ${e.message}`);
    warnings.push(`CSV parse warnings: ${errorMessages.join("; ")}`);
  }

  if (!parseResult.data || parseResult.data.length === 0) {
    return {
      success: false,
      data: [],
      columns: [],
      dateColumn: null,
      valueColumns: [],
      rowCount: 0,
      dateRange: null,
      error: `No data rows found in CSV file: ${fileName}`,
      warnings,
      fileName,
    };
  }

  const columns = parseResult.meta.fields || [];
  if (columns.length === 0) {
    return {
      success: false,
      data: [],
      columns: [],
      dateColumn: null,
      valueColumns: [],
      rowCount: 0,
      dateRange: null,
      error: `No columns found in CSV file: ${fileName}`,
      warnings,
      fileName,
    };
  }

  const dateColumn = detectDateColumn(columns);
  const valueColumns = detectValueColumns(columns, dateColumn);

  if (valueColumns.length === 0) {
    warnings.push("No numeric value columns detected.");
  }

  // Process rows
  const processedData: ChartDataPoint[] = [];
  let skippedRows = 0;

  for (const row of parseResult.data) {
    // Build data point
    const point: ChartDataPoint = {
      date: dateColumn ? (row[dateColumn] || "") : "",
      displayDate: dateColumn ? formatDisplayDate(row[dateColumn] || "") : "",
    };

    // Add date column as-is
    if (dateColumn) {
      point[dateColumn] = row[dateColumn] || "";
    }

    // Convert value columns to numbers
    let hasAnyValue = false;
    for (const col of valueColumns) {
      const rawVal = row[col];
      if (rawVal === undefined || rawVal === null || rawVal.trim() === "") {
        point[col] = NaN;
        continue;
      }
      // Remove commas and currency symbols
      const cleaned = rawVal.replace(/[,₹$%\s]/g, "").trim();
      const num = parseFloat(cleaned);
      if (!isNaN(num)) {
        point[col] = num;
        hasAnyValue = true;
      } else {
        point[col] = NaN;
        warnings.push(`Non-numeric value in column "${col}": "${rawVal}"`);
      }
    }

    if (!hasAnyValue && valueColumns.length > 0) {
      skippedRows++;
      continue;
    }

    processedData.push(point);
  }

  if (skippedRows > 0) {
    warnings.push(`Skipped ${skippedRows} row(s) with no valid numeric values.`);
  }

  // Sort by date if date column exists
  if (dateColumn) {
    processedData.sort((a, b) => {
      const da = parseDate(a[dateColumn] as string);
      const db = parseDate(b[dateColumn] as string);
      if (!da || !db) return 0;
      return da.getTime() - db.getTime();
    });
  }

  // Determine date range
  let dateRange: { start: string; end: string } | null = null;
  if (dateColumn && processedData.length > 0) {
    dateRange = {
      start: processedData[0].displayDate || (processedData[0][dateColumn] as string),
      end: processedData[processedData.length - 1].displayDate || (processedData[processedData.length - 1][dateColumn] as string),
    };
  }

  if (processedData.length === 0) {
    return {
      success: false,
      data: [],
      columns,
      dateColumn,
      valueColumns,
      rowCount: 0,
      dateRange: null,
      error: "No valid data rows could be processed from the CSV file.",
      warnings,
      fileName,
    };
  }

  // Add normalized columns
  const withNormalized = normalizeToBase100(processedData, valueColumns);

  return {
    success: true,
    data: withNormalized,
    columns,
    dateColumn,
    valueColumns,
    rowCount: withNormalized.length,
    dateRange,
    warnings,
    fileName,
  };
}

export function getCSVFilePaths(): CSVFileInfo[] {
  const dataDir = path.join(process.cwd(), process.env.CSV_DATA_DIR || "data");
  const primaryFile = process.env.CSV_PRIMARY_FILE || "mutual_funds.csv";

  const files: CSVFileInfo[] = [];

  // Check if data directory exists
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // ignore
    }
  }

  // Scan for CSV files in data dir
  if (fs.existsSync(dataDir)) {
    try {
      const dirFiles = fs.readdirSync(dataDir);
      const csvFiles = dirFiles.filter((f) => f.endsWith(".csv"));

      // Primary file first
      if (csvFiles.includes(primaryFile)) {
        files.push({
          fileName: primaryFile,
          filePath: path.join(dataDir, primaryFile),
          exists: true,
        });
      }

      // Other CSV files
      for (const f of csvFiles) {
        if (f !== primaryFile) {
          files.push({
            fileName: f,
            filePath: path.join(dataDir, f),
            exists: true,
          });
        }
      }

      // If primary file doesn't exist, still report it
      if (!csvFiles.includes(primaryFile)) {
        files.push({
          fileName: primaryFile,
          filePath: path.join(dataDir, primaryFile),
          exists: false,
        });
      }
    } catch {
      files.push({
        fileName: primaryFile,
        filePath: path.join(dataDir, primaryFile),
        exists: false,
      });
    }
  } else {
    files.push({
      fileName: primaryFile,
      filePath: path.join(dataDir, primaryFile),
      exists: false,
    });
  }

  return files;
}

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpIcon,
  BarChart3Icon,
  CreditCardIcon,
  DollarSignIcon,
  UploadIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CalendarIcon,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { uploadCSV } from "@/app/actions";
import { ThemeToggle } from "@/components/theme-toggle";

// Define the data structure
type SpendingItem = [number, string, number, number, number, string];
type MonthlyData = SpendingItem[];
type ApiResponse = {
  content: MonthlyData[];
};

// Extended data structure with year information
type ExtendedSpendingData = {
  items: MonthlyData[];
  years: Record<number, Record<number, MonthlyData>>;
};

// Month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [extendedData, setExtendedData] = useState<ExtendedSpendingData | null>(
    null
  );
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedUploadMonth, setSelectedUploadMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedUploadYear, setSelectedUploadYear] = useState<number>(
    new Date().getFullYear()
  );
  const [yearFilter, setYearFilter] = useState<number>(2024);
  const [error, setError] = useState<string | null>(null);
  const [mockData, setMockData] = useState<ApiResponse | null>(null);

  // Process data to include year information
  const processDataWithYears = (apiData: ApiResponse): ExtendedSpendingData => {
    // Initialize with 2024 and 2025
    const years: Record<number, Record<number, MonthlyData>> = {
      2024: {},
      2025: {},
    };

    // For sample data, assign to 2024
    apiData.content.forEach((monthData, index) => {
      const month = index + 1;
      years[2024][month] = monthData;
    });

    return {
      items: apiData.content,
      years,
    };
  };

  // Load mock data for testing
  useEffect(() => {
    const sampleData = {
      content: [
        [
          [1, "Zara", 233.92, 0.6, 0.0, "Clothing"],
          [1, "Steam", 233.31, 0.3, 0.0, "Entertainment"],
          [1, "McDonald's", 230.56, 0.4, 0.0, "Dining"],
          [1, "Booking.com", 224.83, 0.5, 0.0, "Travel"],
          [1, "Cabify", 216.5, 0.7, 0.0, "Transport"],
          [1, "Netflix", 214.97, 0.6, 0.0, "Entertainment"],
          [1, "Burger King", 205.16, 0.4, 0.0, "Dining"],
          [1, "Spotify", 202.09, 0.5, 0.0, "Entertainment"],
          [1, "Metro de Madrid", 198.85, 0.8, 0.0, "Transport"],
          [1, "Farmacia", 186.57, 0.9, 0.0, "Health"],
          [1, "Amazon", 185.21, 0.7, 0.0, "Shopping"],
          [1, "Lidl", 118.31, 0.8, 0.0, "Groceries"],
          [1, "Fnac", 108.45, 0.5, 0.0, "Shopping"],
          [1, "Uber", 103.69, 0.7, 0.0, "Transport"],
          [1, "Óptica", 101.25, 0.9, 0.0, "Health"],
          [1, "Mercadona", 106.76, 0.8, 0.0, "Groceries"],
          [1, "Airbnb", 101.91, 0.5, 0.0, "Travel"],
          [1, "Ryanair", 86.59, 0.5, 0.0, "Travel"],
          [1, "Dentista", 184.08, 0.9, 0.0, "Health"],
          [1, "100 Montaditos", 34.79, 0.3, 0.0, "Dining"],
        ],
        [
          [2, "Zara", 306.71, 0.6, 0.0, "Clothing"],
          [2, "Booking.com", 153.34, 0.5, 0.0, "Travel"],
          [2, "Amazon", 108.7, 0.7, 0.0, "Shopping"],
          [2, "Cabify", 108.51, 0.6, 0.0, "Transport"],
          [2, "Burger King", 100.36, 0.3, 0.0, "Dining"],
          [2, "Carrefour", 99.14, 0.8, 0.0, "Groceries"],
          [2, "Airbnb", 85.92, 0.5, 0.0, "Travel"],
          [2, "Lidl", 85.34, 0.8, 0.0, "Groceries"],
          [2, "Steam", 84.74, 0.2, 0.0, "Entertainment"],
          [2, "Mercadona", 83.66, 0.8, 0.0, "Groceries"],
          [2, "Spotify", 83.19, 0.4, 0.0, "Entertainment"],
          [2, "Netflix", 81.2, 0.4, 0.0, "Entertainment"],
          [2, "Óptica", 69.29, 0.7, 0.0, "Health"],
          [2, "Fnac", 66.66, 0.5, 0.0, "Shopping"],
          [2, "Ryanair", 37.59, 0.6, 0.0, "Travel"],
          [2, "McDonald's", 28.05, 0.3, 0.0, "Dining"],
        ],
        [
          [3, "Zara", 536.52, 0.6, 0.3, "Clothing"],
          [3, "Airbnb", 462.38, 0.5, 0.2, "Travel"],
          [3, "Amazon", 317.36, 0.7, 0.0, "Shopping"],
          [3, "Booking.com", 316.09, 0.5, 0.1, "Travel"],
          [3, "McDonald's", 265.33, 0.3, 0.0, "Dining"],
          [3, "Cabify", 214.41, 0.6, 0.0, "Transport"],
          [3, "Ryanair", 194.52, 0.6, 0.0, "Travel"],
          [3, "Dentista", 192.4, 0.9, 0.0, "Health"],
          [3, "Mercadona", 192.2, 0.8, 0.0, "Groceries"],
          [3, "Lidl", 173.99, 0.8, 0.0, "Groceries"],
          [3, "Netflix", 172.62, 0.4, 0.0, "Entertainment"],
          [3, "Uber", 158.69, 0.6, 0.0, "Transport"],
          [3, "Carrefour", 158.58, 0.8, 0.0, "Groceries"],
          [3, "Óptica", 150.31, 0.7, 0.0, "Health"],
          [3, "Steam", 140.75, 0.2, 0.0, "Entertainment"],
          [3, "Spotify", 117.87, 0.4, 0.0, "Entertainment"],
          [3, "100 Montaditos", 101.58, 0.2, 0.0, "Dining"],
          [3, "Fnac", 98.95, 0.5, 0.0, "Shopping"],
        ],
      ],
    };
    setMockData(sampleData);
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file first");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("csv", file, file.name);

      const response = await uploadCSV(formData);

      // Create a new extended data object or use the existing one
      const newExtendedData: ExtendedSpendingData = extendedData
        ? { ...extendedData }
        : {
            items: response.content,
            years: { 2024: {}, 2025: {} },
          };

      // Initialize the year if it doesn't exist
      if (!newExtendedData.years[selectedUploadYear]) {
        newExtendedData.years[selectedUploadYear] = {};
      }

      // Add the new data for the selected month and year
      newExtendedData.years[selectedUploadYear][selectedUploadMonth] =
        response.content[0] || [];

      // Update the state with the merged data
      setExtendedData(newExtendedData);

      // If this is the first upload, also set the data state
      if (!data) {
        setData(response);
      }

      setSelectedMonth(selectedUploadMonth);
      setYearFilter(selectedUploadYear);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        `Failed to upload file: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Handle using mock data
  const handleUseMockData = () => {
    if (mockData) {
      // If we already have data, merge the mock data with it
      if (extendedData) {
        const newExtendedData = { ...extendedData };

        // Add mock data to 2024 if not overwriting existing data
        mockData.content.forEach((monthData, index) => {
          const month = index + 1;
          // Only add if the month doesn't already have data
          if (
            !newExtendedData.years[2024][month] ||
            !newExtendedData.years[2024][month].some((item) => item[2] > 0)
          ) {
            newExtendedData.years[2024][month] = monthData;
          }
        });

        setExtendedData(newExtendedData);
      } else {
        // First time loading mock data
        const processedData = processDataWithYears(mockData);
        setExtendedData(processedData);
        setData(mockData);
      }

      setSelectedMonth(1);
      setYearFilter(2024);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  // If no data is loaded yet, show the file upload screen
  if (!data) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Spending Data</CardTitle>
            <CardDescription>
              Please upload a CSV file with your spending data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("csv-upload")?.click()}
            >
              <UploadIcon className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop your CSV file here, or click to browse
              </p>
              {file && (
                <p className="text-sm font-medium mt-2">
                  Selected: {file.name}
                </p>
              )}
              <input
                id="csv-upload"
                type="file"
                name="csv"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Month and Year
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedUploadMonth}
                  onChange={(e) =>
                    setSelectedUploadMonth(Number.parseInt(e.target.value))
                  }
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {monthNames[i]}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedUploadYear}
                  onChange={(e) =>
                    setSelectedUploadYear(Number.parseInt(e.target.value))
                  }
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                </select>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                This will override the month/year in the file data
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500 mb-4 p-3 bg-red-50 rounded border border-red-200">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
                <p className="mt-2">Try using the direct upload form below:</p>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <Button
                className="w-full"
                onClick={handleUpload}
                disabled={!file || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload and Analyze"}
              </Button>

              <Button
                className="w-full"
                variant="outline"
                onClick={handleUseMockData}
              >
                Use Sample Data
              </Button>

              {error && (
                <div className="border-t pt-4 mt-2">
                  <p className="text-sm font-medium mb-2">
                    Alternative Upload Method:
                  </p>
                  <form
                    action="http://localhost:8081/read-csv"
                    method="post"
                    encType="multipart/form-data"
                    className="flex flex-col gap-2"
                  >
                    <input
                      type="file"
                      id="csv"
                      name="csv"
                      accept=".csv"
                      required
                      className="text-sm"
                    />
                    <Button type="submit" variant="secondary">
                      Direct Upload
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get the current month's data based on selected year and month
  const currentMonthData =
    extendedData?.years[yearFilter]?.[selectedMonth] || [];

  // Filter out items with zero amount
  const filteredData = currentMonthData.filter((item) => item[2] > 0);

  // Transform data for chart
  const chartData = filteredData
    .map((item) => {
      // Calculate color based on the 4th value (index 3)
      // 1 = green, 0 = red, values in between are interpolated
      const colorValue = item[3];
      const red = Math.round(255 * (1 - colorValue));
      const green = Math.round(255 * colorValue);

      return {
        merchant: item[1],
        amount: item[2],
        colorValue: colorValue,
        fill: `rgb(${red}, ${green}, 0)`,
        category: item[5] || "Other",
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10); // Sort by amount and take top 10

  // Calculate total spending for the month
  const totalSpending = filteredData.reduce(
    (sum, item) => sum + Number(item[2].toFixed(2)),
    0
  );

  // Calculate average spending
  const averageSpending =
    filteredData.length > 0 ? totalSpending / filteredData.length : 0;

  // Find highest spending
  const highestSpending = filteredData.reduce(
    (max, item) => Math.max(max, Number(item[2].toFixed(2))),
    0
  );

  // Find merchant with highest spending
  const highestMerchant =
    filteredData.find(
      (item) => Number(item[2].toFixed(2)) === highestSpending
    )?.[1] || "";

  // Calculate spending by category
  const spendingByCategory = filteredData.reduce((acc, item) => {
    const category = item[5] || "Other";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(item[2].toFixed(2));
    return acc;
  }, {} as Record<string, number>);

  // Transform category data for chart
  const categoryChartData = Object.entries(spendingByCategory)
    .map(([category, amount]) => ({
      category,
      amount: Number(amount.toFixed(2)),
      fill: getCategoryColor(category),
    }))
    .sort((a, b) => b.amount - a.amount);

  // Prepare monthly trend data
  const monthlyTrendData = Object.entries(extendedData?.years || {})
    .flatMap(([year, months]) => {
      return Object.entries(months)
        .map(([month, data]) => {
          const monthNum = Number.parseInt(month);
          const yearNum = Number.parseInt(year);
          const totalMonthSpending = data.reduce(
            (sum, item) => sum + Number(item[2].toFixed(2)),
            0
          );

          if (totalMonthSpending === 0) return null;

          return {
            month: `${monthNames[monthNum - 1].substring(0, 3)} ${yearNum}`,
            monthNumber: monthNum,
            year: yearNum,
            total: Number(totalMonthSpending.toFixed(2)),
          };
        })
        .filter(Boolean);
    })
    .sort((a, b) => {
      if (a.year === b.year) {
        return a.monthNumber - b.monthNumber;
      }
      return a.year - b.year;
    });

  // Function to get color for category
  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      Travel: "#4f46e5", // Indigo
      Transport: "#0ea5e9", // Sky blue
      Groceries: "#10b981", // Emerald
      Shopping: "#f59e0b", // Amber
      Entertainment: "#8b5cf6", // Purple
      Dining: "#ec4899", // Pink
      Food: "#ec4899", // Pink (same as Dining)
      Health: "#06b6d4", // Cyan
      Clothing: "#f43f5e", // Rose
      Other: "#6b7280", // Gray
    };
    return colors[category] || colors["Other"];
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">
            Spending Dashboard
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                value={yearFilter}
                onChange={(e) => setYearFilter(Number.parseInt(e.target.value))}
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
              </select>

              <Tabs
                value={selectedMonth.toString()}
                className="space-y-4"
                onValueChange={(value) =>
                  setSelectedMonth(Number.parseInt(value))
                }
              >
                <TabsList>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
                    const hasData =
                      extendedData?.years[yearFilter]?.[month]?.some(
                        (item) => item[2] > 0
                      ) || false;
                    return (
                      <TabsTrigger
                        key={month}
                        value={month.toString()}
                        disabled={!hasData}
                        className={!hasData ? "opacity-50" : ""}
                      >
                        {monthNames[month - 1].substring(0, 3)}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" onClick={() => setData(null)}>
                Upload New File
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Spending
              </CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalSpending.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {monthNames[selectedMonth - 1]} {yearFilter}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Transaction
              </CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${averageSpending.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Per merchant</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Highest Expense
              </CardTitle>
              <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${highestSpending.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">{highestMerchant}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredData.length}</div>
              <p className="text-xs text-muted-foreground">Active merchants</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-7">
            <CardHeader>
              <CardTitle>
                Top Spending for {monthNames[selectedMonth - 1]} {yearFilter}
              </CardTitle>
              <CardDescription>
                Your top 10 expenses for this month
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="merchant"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Amount"]}
                      labelFormatter={(label) => `Merchant: ${label}`}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                  No spending data available for this month
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Spending Categories</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              {categoryChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={categoryChartData} layout="vertical">
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis
                      dataKey="category"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      width={80}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Amount"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                    />
                    <Bar dataKey="amount" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground border border-dashed rounded-md">
                  No category data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
              <CardDescription>Your spending over time</CardDescription>
            </CardHeader>
            <CardContent>
              {monthlyTrendData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyTrendData}>
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Total Spending"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground border border-dashed rounded-md">
                  Not enough data for trend analysis
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Calendar</CardTitle>
              <CardDescription>Spending activity by date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <CalendarIcon className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Calendar view coming soon
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Track your daily spending patterns
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  ButtonGroup,
  Select,
  SelectItem,
  DatePicker,
  Chip,
  Skeleton,
  addToast,
  Spinner,
} from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { convertIDR } from "@/utils/currency";
import { useRouter } from "next/router";

type ChartData = {
  date: string;
  total: number;
  count: number;
};

type Props = {
  hourlyData?: ChartData[];
  dailyData?: ChartData[];
  weeklyData?: ChartData[];
  monthlyData?: ChartData[];
  yearlyData?: ChartData[];
  allTimeData?: ChartData[];
  // Previous period data for growth calculation
  previousHourlyData?: ChartData[];
  previousDailyData?: ChartData[];
  previousWeeklyData?: ChartData[];
  previousMonthlyData?: ChartData[];
  previousYearlyData?: ChartData[];
  isLoading?: boolean;
  isRefetch?: boolean;
  refetch: () => void;
};

type FilterPeriod =
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "all";
type ChartType = "bar" | "line" | "area";
type ChartMode = "current" | "comparison";

const DailyChart = ({
  hourlyData = [],
  dailyData = [],
  weeklyData = [],
  monthlyData = [],
  yearlyData = [],
  allTimeData = [],
  previousHourlyData = [],
  previousDailyData = [],
  previousWeeklyData = [],
  previousMonthlyData = [],
  previousYearlyData = [],
  isLoading = false,
  isRefetch = false,
  refetch,
}: Props) => {
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>("monthly");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [chartMode, setChartMode] = useState<ChartMode>("current");
  const [mount, setMount] = useState(false);
  const { reload } = useRouter();

  useEffect(() => {
    setMount(true);
  }, []);

  // Filter periods configuration
  const filterPeriods = [
    { key: "hourly", label: "Per Jam", icon: Calendar },
    { key: "daily", label: "Harian", icon: Calendar },
    { key: "weekly", label: "Mingguan", icon: Calendar },
    { key: "monthly", label: "Bulanan", icon: Calendar },
    { key: "yearly", label: "Tahunan", icon: Calendar },
    { key: "all", label: "Semua Waktu", icon: Calendar },
  ];

  // Chart types configuration
  const chartTypes = [
    { key: "bar", label: "Bar Chart" },
    { key: "line", label: "Line Chart" },
    { key: "area", label: "Area Chart" },
  ];

  // Chart modes configuration
  const chartModes = [
    { key: "current", label: "Current Period" },
    { key: "comparison", label: "Compare Periods" },
  ];

  // Get data based on selected period
  const currentData = useMemo(() => {
    switch (selectedPeriod) {
      case "hourly":
        return hourlyData;
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
      case "all":
        return allTimeData;
      default:
        return monthlyData;
    }
  }, [
    selectedPeriod,
    hourlyData,
    dailyData,
    weeklyData,
    monthlyData,
    yearlyData,
    allTimeData,
  ]);

  // Get previous period data based on selected period
  const previousPeriodData = useMemo(() => {
    switch (selectedPeriod) {
      case "hourly":
        return previousHourlyData;
      case "daily":
        return previousDailyData;
      case "weekly":
        return previousWeeklyData;
      case "monthly":
        return previousMonthlyData;
      case "yearly":
        return previousYearlyData;
      case "all":
        return []; // No previous data for all time
      default:
        return previousMonthlyData;
    }
  }, [
    selectedPeriod,
    previousHourlyData,
    previousDailyData,
    previousWeeklyData,
    previousMonthlyData,
    previousYearlyData,
  ]);

  // Combine current and previous data for comparison
  const processedData = useMemo(() => {
    if (chartMode === "current") {
      return currentData;
    }

    // For comparison mode, combine current and previous data
    const combinedData: any[] = [];
    const maxLength = Math.max(currentData.length, previousPeriodData.length);

    for (let i = 0; i < maxLength; i++) {
      const currentItem = currentData[i];
      const previousItem = previousPeriodData[i];

      if (currentItem || previousItem) {
        combinedData.push({
          date: currentItem?.date || previousItem?.date || `Point ${i + 1}`,
          currentTotal: currentItem?.total || 0,
          previousTotal: previousItem?.total || 0,
          currentCount: currentItem?.count || 0,
          previousCount: previousItem?.count || 0,
          // Keep original format for backward compatibility
          total: currentItem?.total || 0,
          count: currentItem?.count || 0,
        });
      }
    }

    return combinedData;
  }, [currentData, previousPeriodData, chartMode]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalRevenue = processedData.reduce(
      (sum, item) => sum + item.total,
      0,
    );
    const totalOrders = processedData.reduce(
      (sum, item) => sum + item.count,
      0,
    );
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate growth (compare with previous period)
    const currentPeriodRevenue = totalRevenue;
    const previousPeriodRevenue = previousPeriodData.reduce(
      (sum, item) => sum + item.total,
      0,
    );

    // Calculate growth percentage
    let growthPercentage = 0;
    let growthDirection: "up" | "down" | "neutral" = "neutral";

    if (previousPeriodRevenue > 0) {
      growthPercentage =
        ((currentPeriodRevenue - previousPeriodRevenue) /
          previousPeriodRevenue) *
        100;
      growthDirection =
        growthPercentage > 0 ? "up" : growthPercentage < 0 ? "down" : "neutral";
    } else if (currentPeriodRevenue > 0) {
      // If no previous data but current has data, it's 100% growth
      growthPercentage = 100;
      growthDirection = "up";
    }

    // Calculate orders growth
    const currentPeriodOrders = totalOrders;
    const previousPeriodOrders = previousPeriodData.reduce(
      (sum, item) => sum + item.count,
      0,
    );

    let ordersGrowthPercentage = 0;
    let ordersGrowthDirection: "up" | "down" | "neutral" = "neutral";

    if (previousPeriodOrders > 0) {
      ordersGrowthPercentage =
        ((currentPeriodOrders - previousPeriodOrders) / previousPeriodOrders) *
        100;
      ordersGrowthDirection =
        ordersGrowthPercentage > 0
          ? "up"
          : ordersGrowthPercentage < 0
            ? "down"
            : "neutral";
    } else if (currentPeriodOrders > 0) {
      ordersGrowthPercentage = 100;
      ordersGrowthDirection = "up";
    }

    // Calculate average order value growth
    const previousAverageOrderValue =
      previousPeriodOrders > 0
        ? previousPeriodRevenue / previousPeriodOrders
        : 0;
    let avgOrderValueGrowthPercentage = 0;
    let avgOrderValueGrowthDirection: "up" | "down" | "neutral" = "neutral";

    if (previousAverageOrderValue > 0) {
      avgOrderValueGrowthPercentage =
        ((averageOrderValue - previousAverageOrderValue) /
          previousAverageOrderValue) *
        100;
      avgOrderValueGrowthDirection =
        avgOrderValueGrowthPercentage > 0
          ? "up"
          : avgOrderValueGrowthPercentage < 0
            ? "down"
            : "neutral";
    } else if (averageOrderValue > 0) {
      avgOrderValueGrowthPercentage = 100;
      avgOrderValueGrowthDirection = "up";
    }

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      growthPercentage: Math.abs(growthPercentage),
      growthDirection,
      ordersGrowthPercentage: Math.abs(ordersGrowthPercentage),
      ordersGrowthDirection,
      avgOrderValueGrowthPercentage: Math.abs(avgOrderValueGrowthPercentage),
      avgOrderValueGrowthDirection,
      previousPeriodRevenue,
      previousPeriodOrders,
      previousAverageOrderValue,
    };
  }, [processedData, previousPeriodData]);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-3 shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <div className="space-y-1">
            {chartMode === "comparison" ? (
              <>
                <p className="text-sm text-blue-600">
                  Current:{" "}
                  {convertIDR(
                    payload.find((p: any) => p.dataKey === "currentTotal")
                      ?.value || 0,
                  )}
                </p>
                <p className="text-sm text-orange-600">
                  Previous:{" "}
                  {convertIDR(
                    payload.find((p: any) => p.dataKey === "previousTotal")
                      ?.value || 0,
                  )}
                </p>
                <div className="border-t pt-1">
                  <p className="text-xs text-gray-500">
                    Current Orders: {payload[0]?.payload?.currentCount || 0}
                  </p>
                  <p className="text-xs text-gray-500">
                    Previous Orders: {payload[0]?.payload?.previousCount || 0}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-blue-600">
                  Revenue: {convertIDR(payload[0]?.value || 0)}
                </p>
                <p className="text-sm text-green-600">
                  Orders: {payload[0]?.payload?.count || 0}
                </p>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Render chart based on selected type
  const renderChart = () => {
    const commonProps = {
      data: processedData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
      padding: { right: 15, left: 15 },
    };

    if (chartMode === "comparison") {
      // Comparison mode - show both current and previous data
      switch (chartType) {
        case "line":
          return (
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value: number) => convertIDR(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="currentTotal"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                name="Current Period"
              />
              <Line
                type="monotone"
                dataKey="previousTotal"
                stroke="#f97316"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2 }}
                name="Previous Period"
              />
            </LineChart>
          );
        case "area":
          return (
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => convertIDR(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="currentTotal"
                stackId="1"
                stroke="#3b82f6"
                fill="url(#colorCurrentRevenue)"
                strokeWidth={2}
                name="Current Period"
              />
              <Area
                type="monotone"
                dataKey="previousTotal"
                stackId="2"
                stroke="#f97316"
                fill="url(#colorPreviousRevenue)"
                strokeWidth={2}
                name="Previous Period"
              />
              <defs>
                <linearGradient
                  id="colorCurrentRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient
                  id="colorPreviousRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          );
        default:
          return (
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => convertIDR(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="currentTotal"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Current Period"
              />
              <Bar
                dataKey="previousTotal"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
                name="Previous Period"
              />
            </BarChart>
          );
      }
    } else {
      // Current mode - show only current data
      switch (chartType) {
        case "line":
          return (
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value: number) => convertIDR(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          );
        case "area":
          return (
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => convertIDR(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          );
        default:
          return (
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#666"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => convertIDR(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          );
      }
    }
  };

  return (
    <div className="space-y-6 py-5">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <Skeleton
                  isLoaded={!isLoading && !isRefetch}
                  className="h-6 rounded"
                >
                  <p className="text-xl font-bold text-green-600">
                    {convertIDR(statistics.totalRevenue)}
                  </p>
                </Skeleton>
              </div>
              <div className="rounded-full bg-green-100 p-2">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              {statistics.growthDirection === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : statistics.growthDirection === "down" ? (
                <TrendingDown className="h-3 w-3 text-red-500" />
              ) : (
                <div className="h-3 w-3 rounded-full bg-gray-400" />
              )}
              <span
                className={`text-xs ${
                  statistics.growthDirection === "up"
                    ? "text-green-500"
                    : statistics.growthDirection === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
              >
                {statistics.growthDirection === "up"
                  ? "+"
                  : statistics.growthDirection === "down"
                    ? "-"
                    : ""}
                {statistics.growthPercentage.toFixed(1)}%
              </span>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <Skeleton
                  isLoaded={!isLoading && !isRefetch}
                  className="h-6 rounded"
                >
                  <p className="text-xl font-bold text-blue-600">
                    {statistics.totalOrders.toLocaleString()}
                  </p>
                </Skeleton>
              </div>
              <div className="rounded-full bg-blue-100 p-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              {statistics.ordersGrowthDirection === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : statistics.ordersGrowthDirection === "down" ? (
                <TrendingDown className="h-3 w-3 text-red-500" />
              ) : (
                <div className="h-3 w-3 rounded-full bg-gray-400" />
              )}
              <span
                className={`text-xs ${
                  statistics.ordersGrowthDirection === "up"
                    ? "text-green-500"
                    : statistics.ordersGrowthDirection === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
              >
                {statistics.ordersGrowthDirection === "up"
                  ? "+"
                  : statistics.ordersGrowthDirection === "down"
                    ? "-"
                    : ""}
                {statistics.ordersGrowthPercentage.toFixed(1)}%
              </span>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <Skeleton
                  isLoaded={!isLoading && !isRefetch}
                  className="h-6 rounded"
                >
                  <p className="text-xl font-bold text-purple-600">
                    {convertIDR(statistics.averageOrderValue)}
                  </p>
                </Skeleton>
              </div>
              <div className="rounded-full bg-purple-100 p-2">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              {statistics.avgOrderValueGrowthDirection === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : statistics.avgOrderValueGrowthDirection === "down" ? (
                <TrendingDown className="h-3 w-3 text-red-500" />
              ) : (
                <div className="h-3 w-3 rounded-full bg-gray-400" />
              )}
              <span
                className={`text-xs ${
                  statistics.avgOrderValueGrowthDirection === "up"
                    ? "text-green-500"
                    : statistics.avgOrderValueGrowthDirection === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
              >
                {statistics.avgOrderValueGrowthDirection === "up"
                  ? "+"
                  : statistics.avgOrderValueGrowthDirection === "down"
                    ? "-"
                    : ""}
                {statistics.avgOrderValueGrowthPercentage.toFixed(1)}%
              </span>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Period</p>
                <Skeleton
                  isLoaded={!isLoading && !isRefetch}
                  className="h-6 rounded"
                >
                  <p className="text-xl font-bold text-gray-800">
                    {filterPeriods.find((p) => p.key === selectedPeriod)?.label}
                  </p>
                </Skeleton>
              </div>
              <div className="rounded-full bg-gray-100 p-2">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Chart Card */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Revenue Analytics
              </h3>
              <p className="text-sm text-gray-600">
                Track your sales performance over time
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Period Filter */}
              <ButtonGroup size="sm" variant="bordered">
                {filterPeriods.map((period) => (
                  <Button
                    key={period.key}
                    onPress={() =>
                      setSelectedPeriod(period.key as FilterPeriod)
                    }
                    color={
                      selectedPeriod === period.key ? "primary" : "default"
                    }
                    variant={
                      selectedPeriod === period.key ? "solid" : "bordered"
                    }
                  >
                    {period.label}
                  </Button>
                ))}
              </ButtonGroup>

              {/* Chart Mode Toggle */}
              <ButtonGroup size="sm" variant="bordered">
                {chartModes.map((mode) => (
                  <Button
                    key={mode.key}
                    onPress={() => setChartMode(mode.key as ChartMode)}
                    color={chartMode === mode.key ? "primary" : "default"}
                    variant={chartMode === mode.key ? "solid" : "bordered"}
                  >
                    {mode.label}
                  </Button>
                ))}
              </ButtonGroup>

              {/* Chart Type Selector */}
              <Select
                size="sm"
                placeholder="Chart Type"
                selectedKeys={[chartType]}
                onSelectionChange={(keys) =>
                  setChartType(Array.from(keys)[0] as ChartType)
                }
                className="w-32"
              >
                {chartTypes.map((type) => (
                  <SelectItem key={type.key} textValue={type.key}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="bordered"
                  startContent={
                    <>
                      {isLoading || isRefetch ? (
                        <Spinner size="sm" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                    </>
                  }
                  onPress={() => {
                    refetch();
                    addToast({
                      title: "Success",
                      description: "Successfully refreshed chart data",
                      color: "success",
                      variant: "flat",
                    });
                  }}
                  disabled={isLoading || isRefetch}
                >
                  Refresh
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  startContent={<Download className="h-3 w-3" />}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          {mount && (isLoading || isRefetch) ? (
            <div className="flex h-80 items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-sm text-gray-600">Loading chart data...</p>
              </div>
            </div>
          ) : processedData.length === 0 ? (
            <div className="flex h-80 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <BarChart className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="mb-2 text-lg font-medium text-gray-800">
                  No Data Available
                </h4>
                <p className="text-sm text-gray-600">
                  No orders found for the selected period
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Legend for Comparison Mode */}
              {chartMode === "comparison" && (
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">
                      Current Period
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-600">
                      Previous Period
                    </span>
                  </div>
                </div>
              )}

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Data Summary */}
      {processedData.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <h4 className="text-lg font-semibold text-gray-800">
              Period Summary
            </h4>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {processedData.length}
                </p>
                <p className="text-sm text-gray-600">Data Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {Math.max(...processedData.map((d) => d.count))}
                </p>
                <p className="text-sm text-gray-600">Peak Orders</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {convertIDR(Math.max(...processedData.map((d) => d.total)))}
                </p>
                <p className="text-sm text-gray-600">Peak Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {convertIDR(
                    processedData.reduce((sum, d) => sum + d.total, 0) /
                      processedData.length,
                  )}
                </p>
                <p className="text-sm text-gray-600">Avg Daily</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default DailyChart;

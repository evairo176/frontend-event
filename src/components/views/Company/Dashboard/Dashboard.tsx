import React from "react";
import DailyChart from "./DailyChart";
import { SAMPLE_DATA } from "./Dashboard.constants";
import useDashboard from "./useDashboard";

type Props = {};

const Dashboard = (props: Props) => {
  const {
    dataTransaction,
    isLoadingTransaction,
    isRefetchingTransaction,
    refetchTransaction,
  } = useDashboard();
  return (
    <div className="min-h-screen">
      <DailyChart
        hourlyData={dataTransaction?.data?.hourly || []}
        dailyData={dataTransaction?.data?.daily || []}
        weeklyData={dataTransaction?.data?.weekly || []}
        monthlyData={dataTransaction?.data?.monthly || []}
        yearlyData={dataTransaction?.data?.yearly || []}
        allTimeData={dataTransaction?.data?.all || []}
        previousHourlyData={dataTransaction?.data?.prevHourly || []}
        previousDailyData={dataTransaction?.data?.prevDaily || []}
        previousWeeklyData={dataTransaction?.data?.prevWeekly || []}
        previousMonthlyData={dataTransaction?.data?.prevMonthly || []}
        previousYearlyData={dataTransaction?.data?.prevYearly || []}
        isLoading={isLoadingTransaction}
        isRefetch={isRefetchingTransaction}
        refetch={refetchTransaction}
      />
    </div>
  );
};

export default Dashboard;

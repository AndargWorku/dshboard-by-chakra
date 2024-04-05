import React, { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  ThemeProvider,
  extendTheme,
} from "@chakra-ui/react";
import FullAnalyticsPage from "../components/AnalyticalCard";
import Statics from "../components/Statics";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Extend Chakra UI theme for custom styles
const theme = extendTheme({
  shadows: {
    xl: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
});

interface DataPoint {
  name: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  chart: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, chart }) => (
  <Box
    boxShadow="xl"
    p={4}
    borderRadius="lg"
    border="1px solid #ddd"
    mb={4}
    flexBasis={["100%", "calc(33.33% - 8px)"]}
    display="inline-flex"
  >
    <Stack spacing={2} width="100%">
      <Text fontSize={["md", "lg"]} fontWeight="bold">
        {title}
      </Text>
      {chart}
    </Stack>
  </Box>
);

const SalesSplineAreaChart: React.FC = () => {
  const salesData: DataPoint[] = [
    { name: "Jan", value: 1000 },
    { name: "Feb", value: 1500 },
    { name: "Mar", value: 1200 },
    { name: "Apr", value: 1800 },
    { name: "May", value: 2000 },
    { name: "Jun", value: 2500 },
    { name: "junl", value: 3000 },
    { name: "agu", value: 1000 },
    { name: "sep", value: 1500 },
    { name: "oct", value: 1700 },
    { name: "nove", value: 1900 },
    { name: "dec", value: 3500 },
  ];

  return (
    <ChartCard
      title="Sales transaction show "
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="rgba(0, 128, 0, 0.5)"
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      }
    />
  );
};

const ProductSplineLineChart: React.FC = () => {
  const productData: DataPoint[] = [
    { name: "Jan", value: 500 },
    { name: "Feb", value: 800 },
    { name: "Mar", value: 1200 },
    { name: "Apr", value: 1000 },
    { name: "May", value: 1500 },
    { name: "Jun", value: 1800 },
    { name: "Jula", value: 500 },
    { name: "agu", value: 900 },
    { name: "sep", value: 1000 },
    { name: "nov", value: 2000 },
    { name: "oct", value: 3000 },
    { name: "dec", value: 1800 },
  ];

  return (
    <ChartCard
      title="Product statics"
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};

const RevenuePieChart: React.FC = () => {
  const revenueData: DataPoint[] = [
    { name: "Product A", value: 5000 },
    { name: "Product B", value: 3000 },
    { name: "Product C", value: 2000 },
    { name: "Product D", value: 5000 },
    { name: "Product E", value: 3000 },
    { name: "Product F", value: 2000 },
    { name: "Product G", value: 5000 },
    { name: "Product H", value: 3000 },
    { name: "Product I", value: 2000 },
  ];

  return (
    <ChartCard
      title="Revenue "
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={revenueData}
              fill="rgba(0, 128, 0, 0.5)"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      }
    />
  );
};

const OrderBarChart: React.FC = () => {
  const initialOrderData: DataPoint[] = [
    { name: "Product A", value: 5000 },
    { name: "Product B", value: 3000 },
    { name: "Product C", value: 2000 },
    { name: "Product D", value: 5000 },
    { name: "Product E", value: 3000 },
    { name: "Product F", value: 2000 },
    { name: "Product G", value: 5000 },
    { name: "Product H", value: 3000 },
    { name: "Product I", value: 2000 },
  ];

  const [orderData, setOrderData] = useState<DataPoint[]>(initialOrderData);

  const sortByValue = () => {
    const sortedData = [...orderData].sort((a, b) => a.value - b.value);
    setOrderData(sortedData);
  };

  return (
    <ChartCard
      title="growth of Order "
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderData}>
            <Bar dataKey="value" fill="rgba(0, 128, 0, 0.5)" barSize={11} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      }
    />
  );
};

const TopSalesDonutChart: React.FC = () => {
  const topSalesData: DataPoint[] = [
    { name: "Product A", value: 1500 },
    { name: "Product B", value: 1200 },
    { name: "Product C", value: 1000 },
    { name: "Product D", value: 1500 },
    { name: "Product E", value: 1200 },
    { name: "Product F", value: 1000 },
    { name: "Product G", value: 1500 },
    { name: "Product H", value: 1200 },
    { name: "Product I", value: 1000 },
  ];

  return (
    <ChartCard
      title="Top Sales statics"
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={topSalesData}
              innerRadius={60}
              outerRadius={80}
              fill="rgba(0, 128, 0, 0.5)"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      }
    />
  );
};

const MonthlyIncomeAreaChart: React.FC = () => {
  const monthlyIncomeData: DataPoint[] = [
    { name: "Jan", value: 5000 },
    { name: "Feb", value: 6000 },
    { name: "Mar", value: 4000 },
    { name: "Apr", value: 8000 },
    { name: "May", value: 7000 },
    { name: "Jun", value: 10000 },
    { name: "Jula", value: 5000 },
    { name: "agu", value: 6000 },
    { name: "sep", value: 7000 },
    { name: "nov", value: 8000 },
    { name: "oct", value: 9000 },
    { name: "dec", value: 10000 },
  ];

  return (
    <ChartCard
      title="Monthly Income statics"
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyIncomeData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="rgba(0, 128, 0, 0.5)"
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      }
    />
  );
};

const StockLineChart: React.FC = () => {
  const stockData: DataPoint[] = [
    { name: "Jan", value: 50 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 52 },
    { name: "May", value: 58 },
    { name: "Jun", value: 62 },
    { name: "Jula", value: 50 },
    { name: "agu", value: 55 },
    { name: "sep", value: 60 },
    { name: "nov", value: 52 },
    { name: "oct", value: 58 },
    { name: "dec", value: 62 },
  ];

  return (
    <ChartCard
      title="Stock  rate"
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};

const DoubleStockLineChart: React.FC = () => {
  const stockData1: DataPoint[] = [
    { name: "Jan", value: 50 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 52 },
    { name: "May", value: 58 },
    { name: "Jun", value: 62 },
    { name: "Jula", value: 50 },
    { name: "agu", value: 55 },
    { name: "sep", value: 60 },
    { name: "nov", value: 52 },
    { name: "oct", value: 58 },
    { name: "dec", value: 62 },
  ];

  const stockData2: DataPoint[] = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 50 },
    { name: "Apr", value: 42 },
    { name: "May", value: 48 },
    { name: "Jun", value: 52 },
    { name: "Jula", value: 50 },
    { name: "agu", value: 55 },
    { name: "sep", value: 60 },
    { name: "nov", value: 52 },
    { name: "oct", value: 58 },
    { name: "dec", value: 62 },
  ];

  return (
    <ChartCard
      title="stock rate show"
      chart={
        <ResponsiveContainer width="100%" height={300}>
          <LineChart>
            <Line
              type="monotone"
              dataKey="value"
              data={stockData1}
              stroke="#8884d8"
              name="Stock 1"
            />
            <Line
              type="monotone"
              dataKey="value"
              data={stockData2}
              stroke="#82ca9d"
              name="Stock 2"
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      }
    />
  );
};

const AnalyticalPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Flex direction="row" flexWrap="wrap" p={3} justify="center" gap={3}>
        <FullAnalyticsPage />
        <SalesSplineAreaChart />

        <Statics />
        <OrderBarChart />
        <ProductSplineLineChart />
        <RevenuePieChart />

        <DoubleStockLineChart />
        <MonthlyIncomeAreaChart />

        <TopSalesDonutChart />
      </Flex>
    </ThemeProvider>
  );
};

export default AnalyticalPage;

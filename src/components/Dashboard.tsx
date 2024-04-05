import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { Flex, Stack, Box, Text, Icon } from "@chakra-ui/react";

import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import Statics from "./Statics";

import FullAnalyticsPage from "./AnalyticalCard";

import PopularProductsPage from "./PopularProductsPage";

export {};

const productData = [
  { category: "Category A", count: 20 },
  { category: "Category B", count: 15 },
  { category: "Category C", count: 10 },
  { category: "Category D", count: 20 },
  { category: "Category E", count: 15 },
  { category: "Category F", count: 10 },
  { category: "Category G", count: 20 },
  { category: "Category H", count: 15 },
  { category: "Category I", count: 10 },
  { category: "Category A", count: 20 },
  { category: "Category B", count: 15 },
  { category: "Category C", count: 10 },
  { category: "Category D", count: 20 },
  { category: "Category E", count: 15 },
  { category: "Category F", count: 10 },
  { category: "Category G", count: 20 },
  { category: "Category H", count: 15 },
  { category: "Category I", count: 10 },
];

const categoryData = [
  { category: "Category A", count: 30 },
  { category: "Category B", count: 15 },
  { category: "Category C", count: 27 },
  { category: "Category D", count: 20 },
  { category: "Category E", count: 16 },
  { category: "Category F", count: 19 },
  { category: "Category G", count: 20 },
  { category: "Category H", count: 35 },
];

const shopData = [
  { name: "Shop A", value: 30 },
  { name: "Shop B", value: 40 },
  { name: "Shop C", value: 30 },
  { name: "Shop D", value: 30 },
  { name: "Shop E", value: 40 },
  { name: "Shop F", value: 30 },
  { name: "Shop G", value: 30 },
  { name: "Shop H", value: 40 },
  { name: "Shop I", value: 30 },
];

const reviewData = [
  { date: "2024-01-01", rating: 4 },
  { date: "2024-02-01", rating: 3.5 },
  { date: "2024-03-01", rating: 4.2 },
  { date: "2024-04-01", rating: 4 },
  { date: "2024-05-01", rating: 3.5 },
  { date: "2024-06-01", rating: 4.2 },
  { date: "2024-07-01", rating: 4 },
  { date: "2024-08-01", rating: 3.5 },
  { date: "2024-09-01", rating: 4.2 },
];

const Dashboard: React.FC = () => {
  const getAverageRating = (data: { rating: number }[]): number => {
    const totalRating = data.reduce((acc, curr) => acc + curr.rating, 0);
    return totalRating / data.length;
  };

  const calculateChange = (
    currentCount: number,
    previousCount: number
  ): { change: number; isIncreasing: boolean } => {
    const change = ((currentCount - previousCount) / previousCount) * 100;
    return {
      change,
      isIncreasing: change >= 0,
    };
  };

  const getCategoryChange = (category: string): string => {
    const categoryIndex = categoryData.findIndex(
      (item) => item.category === category
    );
    if (categoryIndex === -1 || categoryIndex === 0) return "";
    const currentCount = categoryData[categoryIndex].count;
    const previousCount = categoryData[categoryIndex - 1].count;
    const { change, isIncreasing } = calculateChange(
      currentCount,
      previousCount
    );
    return `${isIncreasing ? "+" : ""}${change.toFixed(2)}%`;
  };

  return (
    <Flex
      flexWrap="wrap"
      justify="around"
      align="center"
      direction={["column", "row"]}
    >
      <FullAnalyticsPage />

      <Stack direction="row" spacing={4}>
        <Box
          flex="1"
          boxShadow="xl"
          borderRadius="lg"
          p={6}
          m={4}
          maxW="500px"
          textAlign="center"
        >
          <Text fontSize="xl" mb={4}>
            Category Statistics
          </Text>

          <AreaChart width={480} height={300} data={categoryData}>
            <Tooltip />
            <Area type="monotone" dataKey="count" fill="#00800080" />
          </AreaChart>
          <Flex mt={4} flexWrap="wrap" justifyContent="center">
            {categoryData.map((category, index) => (
              <Flex key={index} align="center" mr={4} mb={2}>
                <Text>{category.category}: </Text>
                <Text mr={2}>{getCategoryChange(category.category)}</Text>
                {getCategoryChange(category.category).startsWith("+") ? (
                  <Icon as={FaArrowUp} color="green.500" />
                ) : (
                  <Icon as={FaArrowDown} color="red.500" />
                )}
              </Flex>
            ))}
          </Flex>
        </Box>

        <Box
          flex="1"
          boxShadow="xl"
          borderRadius="lg"
          p={6}
          m={4}
          maxW="500px"
          textAlign="center"
        >
          <Statics />
        </Box>
      </Stack>

      <Stack direction="row" spacing={4}>
        <Box
          flex="1"
          // boxShadow="xl"
          borderRadius="lg"
          p={6}
          m={4}
          maxW="500px"
          textAlign="center"
        >
          <PopularProductsPage />
        </Box>

        <Box
          flex="1"
          boxShadow="xl"
          borderRadius="lg"
          p={6}
          m={4}
          maxW="500px"
          textAlign="center"
        >
          <Text fontSize="xl" mb={4}>
            Product Statistics
          </Text>
          <BarChart width={470} height={300} data={productData}>
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#00800080" barSize={11} />
          </BarChart>
        </Box>
      </Stack>

      <Stack direction="row" spacing={4}>
        <Box
          flex="1"
          boxShadow="xl"
          borderRadius="lg"
          p={6}
          m={4}
          maxW="500px"
          textAlign="center"
        >
          <Text fontSize="xl" mb={4}>
            Shop Statistics
          </Text>
          <PieChart width={470} height={300}>
            <Pie
              data={shopData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="rgba(0, 128, 0, 0.8)"
              label
              dataKey="value"
            >
              {shopData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#00800080" />
              ))}
            </Pie>
          </PieChart>
        </Box>

        <Box
          flex="1"
          boxShadow="xl"
          borderRadius="lg"
          p={6}
          m={4}
          maxW="500px"
          textAlign="center"
        >
          <Text fontSize="xl" mb={4}>
            Review Statistics
          </Text>
          <LineChart width={470} height={300} data={reviewData}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="rgba(0, 128, 0, 0.8)"
            />
          </LineChart>
          <Box textAlign="left">
            <Text fontSize="lg">
              Average Rating: {getAverageRating(reviewData)}
            </Text>
            <Text fontSize="lg">Total Reviews: {reviewData.length}</Text>
            <Box>{/* <ReviewPage/> */}</Box>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Dashboard;

import React from "react";
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import {
  AiOutlineShop,
  AiOutlineShopping,
  AiOutlineStar,
  AiOutlineAppstore,
} from "react-icons/ai";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

interface AnalyticsCardProps {
  title: string;
  value: number;
  data: { name: string; value: number }[];
  icon: React.ReactElement;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  data,
  icon,
}) => {
  const cardBgColor = useColorModeValue("white", "gray.800");

  // Calculate the percentage change
  const percentageChange =
    data.length > 1
      ? ((data[data.length - 1].value - data[0].value) / data[0].value) * 100
      : 0;
  const isIncreasing = percentageChange >= 0;

  return (
    <Box
      bgColor={cardBgColor}
      p={6}
      borderRadius="lg"
      boxShadow="xl"
      width="100%" // Set width to 100% to make the card fill its container
      maxWidth={{ base: "100%", sm: "45%", md: "30%", lg: "22%" }} // Adjust max width based on screen size
      minWidth="200px" // Set min width to ensure cards are not too narrow on small screens
      height={{ base: "auto", sm: "200px", md: "220px", lg: "240px" }}
      display="flex"
      flexDirection="column"
      margin="4"
      position="relative"
    >
      <Flex align="center" mb={4}>
        {React.cloneElement(icon, { color: "green" })}
        <Text fontSize="xl" fontWeight="bold" ml={2}>
          {title}
        </Text>
      </Flex>
      <Text fontSize="xl" fontWeight="normal" mb={4} pl={8}>
        {value}k
      </Text>
      <Flex flex="1" direction="column" justify="flex-end">
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00ff00"
              isAnimationActive={true}
            />
            <Tooltip isAnimationActive={true} />
          </LineChart>
        </ResponsiveContainer>
      </Flex>
      <Box
        position="absolute"
        top="100px"
        right="8px"
        fontSize="sm"
        fontWeight="bold"
        color={isIncreasing ? "green" : "red"}
      >
        {isIncreasing ? <FiArrowUp /> : <FiArrowDown />}
        {`${Math.abs(Number(percentageChange.toFixed(2)))}%`}
      </Box>
    </Box>
  );
};

const FullAnalyticsPage: React.FC = () => {
  // Data for each card
  const shopData = [
    { name: "Jan", value: 5 },
    { name: "Feb", value: 8 },
    { name: "Mar", value: 12 },
    { name: "apr", value: 8 },
    { name: "jun", value: 12 },
    { name: "jula", value: 13 },
  ];

  const productData = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 15 },
    { name: "Mar", value: 25 },
    { name: "apr", value: 20 },
    { name: "jun", value: 15 },
    { name: "jula", value: 25 },
  ];

  const reviewData = [
    { name: "Jan", value: 4 },
    { name: "Feb", value: 7 },
    { name: "Mar", value: 6 },
    { name: "apr", value: 8 },
    { name: "jun", value: 10 },
    { name: "jula", value: 12 },
  ];

  const categoryData = [
    { name: "Category A", value: 15 },
    { name: "Category B", value: 20 },
    { name: "Category C", value: 10 },
  ];

  return (
    <Flex
      justify="center"
      align="center"
      height="100%"
      overflowX="auto"
      pl="30px"
    >
      <Flex direction="row" align="center" flexWrap="nowrap">
        {" "}
        {/* Set flexWrap to nowrap to keep the cards in one line */}
        <AnalyticsCard
          title="Total Shop"
          value={10}
          data={shopData}
          icon={<AiOutlineShop size={24} />}
        />
        <AnalyticsCard
          title="all Product"
          value={50}
          data={productData}
          icon={<AiOutlineShopping size={24} />}
        />
        <AnalyticsCard
          title="Review"
          value={20}
          data={reviewData}
          icon={<AiOutlineStar size={24} />}
        />
        <AnalyticsCard
          title="Category"
          value={45}
          data={categoryData}
          icon={<AiOutlineAppstore size={24} />}
        />
      </Flex>
    </Flex>
  );
};

export default FullAnalyticsPage;

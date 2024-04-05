import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Input,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Sample sales data
const sampleSalesData = [
  {
    id: "1",
    totalAmount: 100,
    status: "Completed",
    userId: "user123",
    createdAt: "2024-03-15T10:30:00Z",
    orderItems: [
      { productId: "p1", quantity: 2, price: 50 },
      { productId: "p2", quantity: 1, price: 50 },
    ],
  },
  {
    id: "2",
    totalAmount: 75,
    status: "Completed",
    userId: "user456",
    createdAt: "2024-03-14T15:45:00Z",
    orderItems: [
      { productId: "p3", quantity: 3, price: 25 },
      { productId: "p4", quantity: 1, price: 50 },
    ],
  },
  {
    id: "3",
    totalAmount: 120,
    status: "Pending",
    userId: "user789",
    createdAt: "2024-03-14T12:00:00Z",
    orderItems: [
      { productId: "p5", quantity: 2, price: 60 },
      { productId: "p6", quantity: 2, price: 30 },
    ],
  },
  {
    id: "4",
    totalAmount: 50,
    status: "Completed",
    userId: "user123",
    createdAt: "2024-03-14T14:00:00Z",
    orderItems: [{ productId: "p7", quantity: 1, price: 50 }],
  },
];

const ITEMS_PER_PAGE = 5;

const RecentSalesTable: React.FC = () => {
  const [sales, setSales] = useState(sampleSalesData);
  const [loading, setLoading] = useState(false);
  const [searchUserId, setSearchUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulating API call to fetch recent sales data
    setLoading(true);
    setTimeout(() => {
      setSales(sampleSalesData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = () => {
    const filtered = sampleSalesData.filter((sale) =>
      sale.userId.toLowerCase().includes(searchUserId.toLowerCase())
    );
    setSales(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = sales.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box overflowX="auto">
      <Box mb={4} display="flex" justifyContent="flex-end">
        <Input
          placeholder="Search by User ID"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          size="md"
          width="300px" // Adjusted width
          textAlign="right" // Right alignment
          mr={2}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Total Amount</Th>
            <Th>Status</Th>
            <Th>User ID</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentItems.map((sale) => (
            <Tr key={sale.id}>
              <Td>{sale.id}</Td>
              <Td>${sale.totalAmount.toFixed(2)}</Td>
              <Td>{sale.status}</Td>
              <Td>{sale.userId}</Td>
              <Td>{new Date(sale.createdAt).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justify="center" mt={4}>
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous Page"
          onClick={prevPage}
          isDisabled={currentPage === 1}
          mr={2}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next Page"
          onClick={nextPage}
          isDisabled={indexOfLastItem >= sales.length}
          ml={2}
        />
      </Flex>
    </Box>
  );
};

export default RecentSalesTable;

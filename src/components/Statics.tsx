
import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Input,
  FormControl,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'; // Import icons

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  userId: string;
}

interface TopOrdersTableProps {
  orders: Order[];
  currentPage: number;
  itemsPerPage: number;
  searchUserId: string;
  setSearchUserId: (userId: string) => void;
}

const TopOrdersTable: React.FC<TopOrdersTableProps> = ({
  orders,
  currentPage,
  itemsPerPage,
  searchUserId,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredOrders =
    searchUserId.trim() !== ''
      ? orders.filter((order) =>
          order.userId.toLowerCase().includes(searchUserId.toLowerCase())
        )
      : orders;

  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <Box borderRadius="lg" overflow="hidden" overflowX="auto">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Total Amount</Th>
            <Th>Status</Th>
            <Th>User ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>${order.totalAmount}</Td>
              <Td>{order.status}</Td>
              <Td>{order.userId}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const Statics: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchUserId, setSearchUserId] = useState('');
  const itemsPerPage = 6;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate total number of pages
  const totalNumberOfPages = Math.ceil(
    sampleOrders.length / itemsPerPage
  );

  // Generate page numbers
  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (_, index) => index + 1
  );

  return (
    <Flex flexDirection="column" p={4} gap={4}>
      {/* Search Input */}
      <FormControl justifyContent="end" width={{ base: '100%', md: '50%' }}>
        <Input
          type="text"
          placeholder="Search by User ID"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
      </FormControl>
      {/* Table */}
      <TopOrdersTable
        orders={sampleOrders}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        searchUserId={searchUserId}
        setSearchUserId={setSearchUserId}
      />
      {/* Pagination Buttons */}
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          color="#008000"
          mr={2}
          leftIcon={<ChevronLeftIcon />}
        >
          Previous
        </Button>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            variant={currentPage === pageNumber ? 'solid' : 'outline'}
            colorScheme={currentPage === pageNumber ? 'green' : undefined}
            mx={1}
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          onClick={handleNextPage}
          color="#008000"
          leftIcon={<ChevronRightIcon />}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default Statics;

const sampleOrders: Order[] = [
  
    {
      id: '1',
      totalAmount: 100,
      status: 'Shipped',
      userId: 'user1',
    },
    {
      id: '2',
      totalAmount: 100,
      status: 'Shipped',
      userId: 'user2',
    },
    {
      id: '3',
      totalAmount: 100,
      status: 'Shipped',
      userId: 'user3',
    },
    {
      id: '4',
      totalAmount: 100,
      status: 'Shipped',
      userId: 'user4',
    },
    {
      id: '5',
      totalAmount: 100,
      status: 'Shipped',
      userId: 'user5',
    },
    // Rest of the sample orders...
    
      {
        id: '1',
        totalAmount: 100,
        status: 'Shipped',
        userId: 'user1',
      },
      {
        id: '2',
        totalAmount: 100,
        status: 'Shipped',
        userId: 'user2',
      },
      {
        id: '3',
        totalAmount: 100,
        status: 'Shipped',
        userId: 'user3',
      },
      {
        id: '4',
        totalAmount: 100,
        status: 'Shipped',
        userId: 'user4',
      },
      {
        id: '5',
        totalAmount: 100,
        status: 'Shipped',
        userId: 'user5',
      },
      // Rest of the sample orders...
    ];
    
  
  // Sample orders...






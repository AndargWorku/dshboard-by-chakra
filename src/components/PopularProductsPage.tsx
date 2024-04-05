import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  brand: string;
  stockQuantity: number;
}

const PopularProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);

  // Sample data
  const products: Product[] = [
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },

    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },

    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
    {
      id: "1",
      name: "Product 1",
      price: 50,
      description: "Description for product 1",
      imageUrl: "https://via.placeholder.com/150",
      brand: "Brand A",
      stockQuantity: 100,
    },
  ];

  const tableVariant = "simple";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box boxShadow="xl" p={6} borderRadius="xl">
      <Flex justify="flex-end" mb={4}>
        <Input
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          width={{ base: "100%", sm: "auto" }}
          mr={{ base: 0, sm: 4 }}
        />
      </Flex>
      <Table variant={tableVariant} size="md" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price ($)</Th>
            {/* <Th>Description</Th> */}
            <Th>Brand</Th>
            <Th>Stock Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedProducts.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              {/* <Td>{product.description}</Td> */}
              <Td>{product.brand}</Td>
              <Td>{product.stockQuantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justify="center" mt={4}>
        <IconButton
          aria-label="Previous page"
          icon={<FiChevronLeft />}
          color="#00800080"
          onClick={prevPage}
          disabled={currentPage === 1}
          mr={2}
        />
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant="outline"
            colorScheme={currentPage === pageNumber ? "green" : undefined}
            onClick={() => changePage(pageNumber)}
            mx={1}
          >
            {pageNumber}
          </Button>
        ))}
        <IconButton
          color="#00800080"
          aria-label="Next page"
          icon={<FiChevronRight />}
          onClick={nextPage}
          disabled={currentPage === totalPages}
          ml={2}
        />
      </Flex>
    </Box>
  );
};

export default PopularProductsPage;

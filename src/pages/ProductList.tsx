import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
  photo: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    
      {
        "id": "1",
        "name": "Laptop",
        "category": "Electronics",
        "price": 999,
        "quantity": 10,
        "date": "2024-03-05",
        "photo": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
      },
      {
        "id": "2",
        "name": "Smartphone",
        "category": "Electronics",
        "price": 699,
        "quantity": 15,
        "date": "2024-03-05",
        "photo": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
      },
      {
        "id": "3",
        "name": "Headphones",
        "category": "Electronics",
        "price": 149,
        "quantity": 20,
        "date": "2024-03-05",
        "photo": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
      },
      {
        "id": "4",
        "name": "Desk",
        "category": "Furniture",
        "price": 299,
        "quantity": 5,
        "date": "2024-03-05",
        "photo": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
      },
      {
        "id": "5",
        "name": "Chair",
        "category": "Furniture",
        "price": 129,
        "quantity": 8,
        "date": "2024-03-05",
        "photo": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
      },
      {
        "id": "6",
        "name": "Bookshelf",
        "category": "Furniture",
        "price": 199,
        "quantity": 3,
        "date": "2024-03-05",
        "photo": "bookshelf.jpg"
      },
      {
        "id": "7",
        "name": "T-shirt",
        "category": "Clothing",
        "price": 19,
        "quantity": 30,
        "date": "2024-03-05",
        "photo": "tshirt.jpg"
      },
      {
        "id": "8",
        "name": "Jeans",
        "category": "Clothing",
        "price": 49,
        "quantity": 25,
        "date": "2024-03-05",
        "photo": "jeans.jpg"
      },
      {
        "id": "9",
        "name": "Sneakers",
        "category": "Footwear",
        "price": 79,
        "quantity": 12,
        "date": "2024-03-05",
        "photo": "sneakers.jpg"
      },
      {
        "id": "10",
        "name": "Watch",
        "category": "Accessories",
        "price": 129,
        "quantity": 18,
        "date": "2024-03-05",
        "photo": "watch.jpg"
      }
    
    
  ]);

  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [filter, setFilter] = useState({ name: '', category: '', date: '' });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        product.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        product.date.includes(filter.date)
    );
    setSortedProducts(filtered);
    setCurrentPage(1);
  }, [products, filter]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSort = (field: keyof Product) => {
    let direction = 'asc';

    if (sortConfig && sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: field, direction });
    const sorted = [...products].sort((a, b) => {
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      return 0;
    });

    setSortedProducts(sorted);
  };

  const getSortIcon = (field: keyof Product) => {
    if (!sortConfig || sortConfig.key !== field) {
      return <FaSort />;
    }

    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const handleFilter = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        product.category.toLowerCase().includes(filter.category.toLowerCase()) &&
        product.date.includes(filter.date)
    );
    setSortedProducts(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmation(id);
  };

  const handleEdit = (editedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  const handleAdd = (newProduct: Product) => {
    const id = (products.length + 1).toString();
    const updatedProducts = [...products, { ...newProduct, id }];
    setProducts(updatedProducts);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <Box className="container mx-auto p-6 block">
      <Text fontSize="3xl" fontWeight="semibold" mb="6">
        Product List Page
      </Text>

      <Button
        onClick={() => {
          setSelectedProduct({
            id: (products.length + 1).toString(),
            name: '',
            category: '',
            price: 0,
            quantity: 0,
            date: '',
            photo: '',
          });
          setModalOpen(true);
        }}
        bgColor="green"
        color="white"
        rounded="md"
        px="4"
        py="2"
        mb="4"
        _hover={{ m: '2' }}
      >
        Add Product
      </Button>
      

      <ProductTable
        products={currentItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        onSort={handleSort}
        getSortIcon={getSortIcon}
        onFilter={handleFilter}
      />

      <Flex justify="center" align="center" mt="4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          bgColor="green"
          color="white"
          px="3"
          py="1"
          rounded="md"
          mr="2"
          _hover={{ m: '2' }}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-2 mx-1 rounded-md ${
              currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          bgColor="green"
          color="white"
          px="3"
          py="1"
          rounded="md"
          ml="2"
          _hover={{ m: '2' }}
        >
          Next
        </Button>
      </Flex>
    

      {/* {deleteConfirmation && (
  <Box
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center"
  >
    <Box className="bg-white p-6 rounded-md w-96 shadow-lg">
      <Text>{`Are you sure you want to delete product with ID: ${deleteConfirmation}?`}</Text>
      <Button
        onClick={() => {
          const updatedProducts = products.filter(
            (product) => product.id !== deleteConfirmation
          );
          setProducts(updatedProducts);
          setDeleteConfirmation(null);
        }}
        className="yes px-4 py-2 rounded-md mr-2 bg-pink-500 hover:bg-red-700"
        colorScheme='purple'
      >
        Yes
      </Button>
      <Button
        onClick={() => setDeleteConfirmation(null)} colorScheme='pink'
        className="cancel px-4 py-2 rounded-md hover:bg-gray-400 "
      >
        Cancel
      </Button>
    </Box>
  </Box>
)} */}
{deleteConfirmation && (
  <Modal isOpen={true} onClose={() => setDeleteConfirmation(null)}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader className="bg-gray-800 bg-opacity-75 text-white">Confirmation</ModalHeader>
      <ModalBody>
        <Box className="bg-white p-6 rounded-md w-96">
          <p>{`Are you sure you want to delete product with ID: ${deleteConfirmation}?`}</p>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="pink"
          mr={2}
          className="px-4 py-2 rounded-md mr-2 bg-pink-500 hover:bg-red-700"
          onClick={() => {
            const updatedProducts = products.filter((product) => product.id !== deleteConfirmation);
            setProducts(updatedProducts);
            setDeleteConfirmation(null);
          }}
        >
          Yes
        </Button>
        <Button
          className="px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={() => setDeleteConfirmation(null)}
          variant="ghost"
        >
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)}


     

      {modalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
          onSave={(editedProduct) => {
            if (selectedProduct) {
              handleEdit(editedProduct);
            } else {
              handleAdd(editedProduct);
            }
            setModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </Box>
  );
};

export default ProductList;

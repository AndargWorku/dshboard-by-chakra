

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { Box, Button, Input, Image } from '@chakra-ui/react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
  photo: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (editedProduct: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product>({
    id: '',
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    date: '',
    photo: '',
  });

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  const handlePhotoDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event?.target && event.target.result) {
          const result = event.target.result.toString();
          setEditedProduct((prevProduct) => ({ ...prevProduct, photo: result }));
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handlePhotoDrop,
    accept: 'image/*' as unknown as Accept,
  });

  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bg="rgba(0, 0, 0, 0.75)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg="white" p={6} rounded="md" w={96}>
        <Box mb={4}>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name:
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            variant="filled"
          />
        </Box>
        <Box mb={4}>
          <label htmlFor="category" className="block text-sm font-semibold mb-2">
            Category:
          </label>
          <Input
            type="text"
            id="category"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            variant="filled"
          />
        </Box>
        <Box mb={4}>
          <label htmlFor="price" className="block text-sm font-semibold mb-2">
            Price:
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            variant="filled"
          />
        </Box>
        <Box mb={4}>
          <label htmlFor="quantity" className="block text-sm font-semibold mb-2">
            Quantity:
          </label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={editedProduct.quantity}
            onChange={handleChange}
            variant="filled"
          />
        </Box>
        <Box mb={4}>
          <label htmlFor="date" className="block text-sm font-semibold mb-2">
            Date:
          </label>
          <Input
            type="text"
            id="date"
            name="date"
            value={editedProduct.date}
            onChange={handleChange}
            variant="filled"
          />
        </Box>
        <Box mb={4}>
          <label htmlFor="photo" className="block text-sm font-semibold mb-2">
            Photo:
          </label>
          <Box
            {...getRootProps()}
            p={2}
            border="2px"
            borderColor="gray.300"
            borderRadius="md"
            cursor="pointer"
            onDragOver={(e: React.DragEvent<HTMLElement>) => {
              e.preventDefault();
            }}
          >
            <input {...getInputProps()} />
            {editedProduct.photo ? (
              <Image src={editedProduct.photo} alt={`Category ${editedProduct.name}`} w={16} h={16} rounded="md" objectFit="cover" />
            ) : (
              <p className="text-gray-500 text-center">Drag & Drop a photo here</p>
            )}
          </Box>
        </Box>

        <Button onClick={handleSave} colorScheme="green" mr={2}>
          Save
        </Button>
        <Button onClick={onClose} colorScheme="green">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ProductModal;








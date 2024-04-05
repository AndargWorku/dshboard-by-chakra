
import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Stack,
  InputLeftAddon,
  InputGroup,
  Checkbox,
} from '@chakra-ui/react';

import { SearchIcon, ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

interface Permission {
  id: number;
  name: string;
  description: string;
}

const PermissionPage: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 1, name: 'Read Only', description: 'Permission for read-only access.' },
    { id: 2, name: 'Write Access', description: 'Permission for write access to certain resources.' },
    { id: 3, name: 'Admin Access', description: 'Full administrative access with all permissions.' },
    { id: 4, name: 'Guest Access', description: 'Limited access for guest users.' },
    { id: 5, name: 'Editor', description: 'Permission for editing content.' },
    { id: 6, name: 'Viewer', description: 'Permission for viewing content only.' },
    { id: 7, name: 'Moderator', description: 'Permission for moderating user-generated content.' },
    { id: 8, name: 'Report Viewer', description: 'Access to view reports and analytics.' },
    { id: 9, name: 'Data Entry', description: 'Permission for entering data into the system.' },
    { id: 10, name: 'Manager', description: 'Management-level access with various permissions.' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [newPermission, setNewPermission] = useState<Permission>({ id: 0, name: '', description: '' });
  const [nameFilter, setNameFilter] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Track sorting order

  // Modals
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleSearchByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const sortedPermissions = [...permissions].sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setPermissions(sortedPermissions);
  };

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const handleCreate = () => {
    setNewPermission({ id: 0, name: '', description: '' });
    onOpen();
  };

  const handleSave = () => {
    const updatedPermissions = newPermission.id === 0
      ? [...permissions, { ...newPermission, id: permissions.length + 1 }]
      : permissions.map(permission => (permission.id === newPermission.id ? newPermission : permission));

    setPermissions(updatedPermissions);
    onClose();
  };

  const handleEdit = (id: number) => {
    const permissionToEdit = permissions.find(permission => permission.id === id);
    if (permissionToEdit) {
      setNewPermission(permissionToEdit);
      onOpen();
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    onOpenDeleteModal();
  };

  const handleConfirmDelete = () => {
    const updatedPermissions = permissions.filter(permission => !selectedPermissions.includes(permission.id));
    setPermissions(updatedPermissions);
    setSelectedPermissions([]);
    onCloseDeleteModal();
  };

  const handleCheckboxChange = (id: number) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions(selectedPermissions.filter(permissionId => permissionId !== id));
    } else {
      setSelectedPermissions([...selectedPermissions, id]);
    }
  };

  const totalPages = Math.ceil(filteredPermissions.length / pageSize);
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentPermissions = filteredPermissions.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => {
      if (number === 1 || number === currentPage || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
        return (
          <Button
            key={number}
            onClick={() => handlePageChange(number)}
            variant={number === currentPage ? 'solid' : 'outline'}
            colorScheme={number === currentPage ? 'pink' : 'purple'}
          >
            {number}
          </Button>
        );
      } else if (number === 2 || number === totalPages - 1) {
        return (
          <Button key={number} isDisabled>
            ...
          </Button>
        );
      }
      return null;
    });
  };

  return (
    <Box boxShadow="xl" mb={4}>
      <Button onClick={handleCreate} mb={4} position="relative" top="50px" right="500px" colorScheme='purple'>
        Create
      </Button>

      <Stack spacing={4} mb={4} align="center" width='sm' position="relative" left="700px" top="20px">
        <InputGroup size="sm" ml="auto">
          <InputLeftAddon children={<SearchIcon />} />
          <Input placeholder="Search by Name" value={nameFilter} onChange={handleSearchByName} />
        </InputGroup>
        <Button onClick={handleSort} leftIcon={sortOrder === 'asc' ? <TriangleUpIcon /> : <TriangleDownIcon />} colorScheme='purple'>
          Sort by Name
        </Button>
      </Stack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
            <Th>Select</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentPermissions.map(permission => (
            <Tr key={permission.id}>
              <Td>{permission.id}</Td>
              <Td>{permission.name}</Td>
              <Td>{permission.description}</Td>
              <Td>
                <Button color="pink.500" onClick={() => handleEdit(permission.id)}>
                  Edit
                </Button>
                <Button color='purple.950' ml={2} onClick={() => handleDelete(permission.id)}>
                  Delete
                </Button>
              </Td>
              <Td>
                <Checkbox
                  isChecked={selectedPermissions.includes(permission.id)}
                  onChange={() => handleCheckboxChange(permission.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={4} display="flex" justifyContent="center" alignItems="center">
        <Button disabled={currentPage === 1} onClick={prevPage} leftIcon={<ChevronLeftIcon />} colorScheme='pink'>
          Previous
        </Button>
        {renderPageNumbers()}
        <Button
          disabled={currentPage === totalPages}
          onClick={nextPage}
          ml={4}
          rightIcon={<ChevronRightIcon />}
          colorScheme='pink'
        >
          Next
        </Button>
      </Box>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete the selected permissions?</ModalBody>
          <ModalFooter gap={3}>
            <Button colorScheme="pink" onClick={handleConfirmDelete}>
              Yes
            </Button>
            <Button onClick={onCloseDeleteModal} colorScheme='purple'>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create/Edit Permission Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{newPermission.id === 0 ? 'Create' : 'Edit'} Permission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={newPermission.name}
                onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={newPermission.description}
                onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button colorScheme="pink" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose} colorScheme='purple'>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PermissionPage;

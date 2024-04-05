
import React, { useState } from 'react';
import {
  FaTh,
  FaBars,
  FaShoppingBag,
  FaRegChartBar,
} from 'react-icons/fa';

import { NavLink } from 'react-router-dom';
import { Box, IconButton, Text, Flex } from '@chakra-ui/react';

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

const Sidebar: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const menuItems: MenuItem[] = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: '/analytics',
      name: 'Analytics',
      icon: <FaRegChartBar />,
  },
    {
      path: '/product',
      name: 'Product',
      icon: <FaShoppingBag />,
    },
  ];

  return (
    <Flex>
      <Box
        width={isOpen ? '200px' : '50px'}
        bg="#fff"
        boxShadow="5px 5px 4px rgb(212, 212, 212)"
        color="#000"
        height="auto"
        transition="all 0.5s"
        overflowX="hidden"
      >
        <Flex
          className="top_section"
          direction="column"
          align="center"
          justify="center"
          p="20px 15px"
        >
          <Text fontSize={isOpen ? '30px' : '0'} className="logo">
            Logo
          </Text>
          <IconButton
            marginLeft={isOpen ? '50px' : '0px'}
            className="bars"
            fontSize="25px"
            aria-label="Toggle Sidebar"
            icon={<FaBars />}
            onClick={toggle}
          />
        </Flex>
        {menuItems.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <Flex
              p="8px 13px"
              color="#006400"
              _hover={{ bgColor: ' #006400', color: '#fff', margin: '10px', borderRadius: '10px' }}
              _active={{ bgColor: ' #006400', color: '#fff', margin: '10px', borderRadius: '10px' }}
            >
              <Box className="icon" marginRight="1">
                {item.icon}
              </Box>
              <Text
                display={isOpen ? 'block' : 'none'}
                className="link_text text-sm"
                marginLeft="1"
              >
                {item.name}
              </Text>
            </Flex>
          </NavLink>
        ))}
      </Box>
      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default Sidebar;

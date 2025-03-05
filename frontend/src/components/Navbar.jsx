import { Container, HStack, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";

import {useColorMode } from "./ui/color-mode";
import { LuSun } from "react-icons/lu";
import { IoMoonOutline  } from "react-icons/io5"

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW="1140px" px={4}  >
      <Flex
        h={16}
        alignItems="center" 
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: 28, sm: 44 }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r" gradientFrom="red.400" gradientTo="blue.400"
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack 
          spacing={2} 
          lignItems="center"
          
        >
          <Link to="/create">
            <Button>
      
              <CiSquarePlus  fontSize={20} />
              
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoonOutline  /> : <LuSun size={20} /> }
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;

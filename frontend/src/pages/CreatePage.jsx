import { useState } from 'react';
import { Container, Heading, VStack, Box, Button, Input } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from "../store/product"

import { toaster } from "@/components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const {createProduct} = useProductStore()

  const handleAddProduct = async () => {
    const {success,message} = await createProduct(newProduct);
    if (!success) {
      toaster.error({
      title: "Error!",
      description: message,
      status: "error",
      isClosable: true,
      });
    } else {
      toaster.success({
      title: "Update successful",
      description: "File saved successfully to the server" ,
      status: "success",
      isClosable: true,
      });
    }  
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container 
      maxW={["90%", "80%", "600px"]}
      p={[4, 6]}
      mx="auto" 
      mt={20}
    
    >
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}
        >
          Create New Product
        </Heading>
         
          <Box
            w="full" bg={useColorModeValue("white", "gray.800")}
            p={6} rounded="lg" shadow="md"
          >
            <VStack spacing={4}  >
              <Input 
                placeholder='Product Name'
                name='name'
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}

                border="1px solid gray"
                borderRadius="md"
               
              

              />

              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}

                border="1px solid gray"
                borderRadius="md"
                
              />

              <Input
                placeholder='Image URL'
                name='image'
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}

                border="1px solid gray"
                borderRadius="md"
                
              />

              <Button colorScheme="blue" onClick={handleAddProduct} w="full" > Add Product</Button>
            </VStack>
          </Box>
        
      </VStack>
    </Container>
  );
};

export default CreatePage
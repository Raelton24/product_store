import { Box, Image, Heading, Text, HStack, IconButton,
  Button, VStack, Input 
  } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { LuTrash2} from "react-icons/lu"
import { LucideEdit } from "lucide-react";
import { useProductStore } from "@/store/product";
import { toaster } from "./ui/toaster";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg= useColorModeValue("white", "gray.700");

    const { deleteProduct, updateProduct } = useProductStore();

    const [ updatedProduct, setUpdatedProduct ] = useState(product);

    const handleDeleteProduct = async (pid) => {
      const { success, message} = await deleteProduct(pid)
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
            description: success ,
            status: "success",
            isClosable: true,
            });
          }  
    };

      
  const handleUpdateProduct  = async (pid, updatedProduct) => {
   const { success, message}  = await updateProduct(pid, updatedProduct);
   if (!success) {
    toaster.error({
    title: "Error!",
    description: message,
    status: "error",
    isClosable: true,
    }); 
  } else {
    toaster.success({
    title: "success",
    description: "Product Updated successfully" ,
    status: "success",
    isClosable: true,
    });
  };
  };
 
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        height="300px"
        w="100%"
        fit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <DialogRoot>
            <DialogTrigger asChild>
              <IconButton
                aria-label="Update Product"
                bg="blue.500"
                _hover={{ bg: "blue.600" }}
                variant="ghost"
              >
                <LucideEdit />
              </IconButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Price"
                    name="price"
                    type="Number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />

                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button
                    bg="blue.400"
                    onClick={() =>
                      handleUpdateProduct(product._id, updatedProduct)
                    }
                  >
                    Update
                  </Button>
                </DialogActionTrigger>

                <DialogActionTrigger asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogActionTrigger>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>

          <IconButton
            aria-label="Search database"
            bg="red.500"
            _hover={{ bg: "red.600" }}
            variant="ghost"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <LuTrash2 />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
}


export default ProductCard
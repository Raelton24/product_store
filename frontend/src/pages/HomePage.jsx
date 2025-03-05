import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); 
  console.log("Products", products)
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} >
      <Text 
          fontSize={{ base: 28, sm: 44 }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r" gradientFrom="red.400" gradientTo="blue.400"
          bgClip="text"
        >
          Current Product 🚀
        </Text>

        <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3
        }}
        gap={10}
        w="full"
        >          
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No Product Found 😥 {" "}
              <Link to={"/create"}>
                <Text as="span" color="blue.500" _hover={{ textDecoration: "underline"}}>
              Create a Product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage
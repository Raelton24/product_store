import {Box} from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "./components/ui/color-mode";

import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    
    <Box minH={"100vh"} bg={useColorModeValue("red.100", "blue.900")}>
      <Toaster />
      <Navbar />
      <Routes>
        
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </Box>
  );
}

export default App

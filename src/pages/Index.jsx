import { useState } from "react";
import { Box, Heading, Input, Button, Text, Table, Thead, Tbody, Tr, Th, Td, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`https://tmapi.catague.app/api/pl.php?start=2024/03/0100:00:00&end=2024/03/1500:00:00&hashkey=d56377346b5ea138f1751f1569c01e94&limits=0&limite=20`);
    const jsonData = await response.json();
    setData(jsonData);
    setIsLoading(false);
  };

  return (
    <Box bg={bgColor} minH="100vh" p={8} color={textColor}>
      <Heading as="h1" size="xl" mb={8}>
        API Data Fetcher
      </Heading>
      <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={fetchData} isLoading={isLoading} mb={8}>
        Fetch Data
      </Button>
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
      <Button onClick={toggleColorMode} mt={8}>
        Toggle Color Mode
      </Button>
    </Box>
  );
};

export default Index;

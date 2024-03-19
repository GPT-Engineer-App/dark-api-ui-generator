import { useState } from "react";
import { Box, Heading, Input, Button, Text, Table, Thead, Tbody, Tr, Th, Td, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [username, setUsername] = useState("");
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`https://tmapi.catague.app/api/pl.php?start=${startDate}&end=${endDate}&username=${username}&limit=${limit}`);
    const jsonData = await response.json();
    setData(jsonData);
    setIsLoading(false);
  };

  return (
    <Box bg={bgColor} minH="100vh" p={8} color={textColor}>
      <Heading as="h1" size="xl" mb={8}>
        API Data Fetcher
      </Heading>
      <Box mb={8}>
        <Input placeholder="Start Date (YYYY/MM/DD HH:mm:ss)" value={startDate} onChange={(e) => setStartDate(e.target.value)} mr={4} />
        <Input placeholder="End Date (YYYY/MM/DD HH:mm:ss)" value={endDate} onChange={(e) => setEndDate(e.target.value)} mr={4} />
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} mr={4} />
        <Input placeholder="Limit" value={limit} onChange={(e) => setLimit(e.target.value)} mr={4} />
        <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={fetchData} isLoading={isLoading}>
          Fetch Data
        </Button>
      </Box>
      {data.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.username}</Td>
                <Td>{item.date}</Td>
                <Td>{item.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No data available</Text>
      )}
      <Button onClick={toggleColorMode} mt={8}>
        Toggle Color Mode
      </Button>
    </Box>
  );
};

export default Index;

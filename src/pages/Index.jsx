import { useState } from "react";
import { Box, Heading, Input, Button, Text, Table, Thead, Tbody, Tr, Th, Td, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [startDate, setStartDate] = useState("2024/03/01");
  const [startTime, setStartTime] = useState("00:00:00");
  const [endDate, setEndDate] = useState("2024/03/15");
  const [endTime, setEndTime] = useState("00:00:00");
  const [hashkey, setHashkey] = useState("d56377346b5ea138f1751f1569c01e94");
  const [limitStart, setLimitStart] = useState("0");
  const [limitEnd, setLimitEnd] = useState("20");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(`https://tmapi.catague.app/api/pl.php?start=${startDate}${startTime}&end=${endDate}${endTime}&hashkey=${hashkey}&limits=${limitStart}&limite=${limitEnd}`);
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
        <Text mb={1}>Start Date (YYYY/MM/DD)</Text>
        <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} mb={4} />

        <Text mb={1}>Start Time (HH:mm:ss)</Text>
        <Input value={startTime} onChange={(e) => setStartTime(e.target.value)} mb={4} />

        <Text mb={1}>End Date (YYYY/MM/DD)</Text>
        <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} mb={4} />

        <Text mb={1}>End Time (HH:mm:ss)</Text>
        <Input value={endTime} onChange={(e) => setEndTime(e.target.value)} mb={4} />

        <Text mb={1}>Hashkey</Text>
        <Input value={hashkey} onChange={(e) => setHashkey(e.target.value)} mb={4} />

        <Text mb={1}>Limit Start</Text>
        <Input value={limitStart} onChange={(e) => setLimitStart(e.target.value)} mb={4} />

        <Text mb={1}>Limit End</Text>
        <Input value={limitEnd} onChange={(e) => setLimitEnd(e.target.value)} />
      </Box>
      <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={fetchData} isLoading={isLoading} mb={8}>
        Fetch Data
      </Button>
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Button onClick={toggleColorMode} mt={8}>
        Toggle Color Mode
      </Button>
    </Box>
  );
};

export default Index;

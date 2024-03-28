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
    const baseURL = "https://tmapi.catague.app/api/pl.php?";
    const queryParams = `start=${encodeURIComponent(startDate + startTime)}&end=${encodeURIComponent(endDate + endTime)}&hashkey=${encodeURIComponent(hashkey)}&limits=${encodeURIComponent(limitStart)}&limite=${encodeURIComponent(limitEnd)}`;
    const response = await fetch(`${baseURL}${queryParams}`);
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
        <Text mb={1} fontSize="lg" fontWeight="bold">
          Start Date (YYYY/MM/DD)
        </Text>
        <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} mb={4} />

        <Text mb={1} fontSize="lg" fontWeight="bold">
          Start Time (HH:mm:ss)
        </Text>
        <Input value={startTime} onChange={(e) => setStartTime(e.target.value)} mb={4} />

        <Text mb={1} fontSize="lg" fontWeight="bold">
          End Date (YYYY/MM/DD)
        </Text>
        <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} mb={4} />

        <Text mb={1} fontSize="lg" fontWeight="bold">
          End Time (HH:mm:ss)
        </Text>
        <Input value={endTime} onChange={(e) => setEndTime(e.target.value)} mb={4} />

        <Text mb={1} fontSize="lg" fontWeight="bold">
          Hashkey
        </Text>
        <Input value={hashkey} onChange={(e) => setHashkey(e.target.value)} mb={4} />

        <Text mb={1} fontSize="lg" fontWeight="bold">
          Limit Start
        </Text>
        <Input value={limitStart} onChange={(e) => setLimitStart(e.target.value)} mb={4} />

        <Text mb={1} fontSize="lg" fontWeight="bold">
          Limit End
        </Text>
        <Input value={limitEnd} onChange={(e) => setLimitEnd(e.target.value)} />
      </Box>
      <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={fetchData} isLoading={isLoading} mb={8}>
        Fetch Data
      </Button>
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        {data.map((item) => (
          <Box key={item.id} mb={4}>
            <Text>Username: {item.username}</Text>
            <Text>Transaction ID: {item.transaction_id}</Text>
            <Text>To User: {item.to_user}</Text>
            <Text>Transfer Comment: {item.transfer_comment}</Text>
            <Text>AfterBalance: {item.after_balance}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Before Balance: {item.before_balance}</Text>
          </Box>
        ))}
      </Box>
      <Button onClick={toggleColorMode} mt={8}>
        Toggle Color Mode
      </Button>
    </Box>
  );
};

export default Index;

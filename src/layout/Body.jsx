import { Flex } from '@chakra-ui/react';

function Body({ children }) {
  return (
    <Flex h="100vh" align="center" bg="gray.50" pt={50} direction="column">
      {children}
    </Flex>
  );
}

export default Body;

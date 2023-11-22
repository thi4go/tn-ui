import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  useBreakpointValue,
  Heading,
} from '@chakra-ui/react';
import Logo from '../images/logo.png';
import { useAuth } from '../hocs/AuthProvider';
import { fetchLogout } from '../queries/queries';
import { useMutation } from '@tanstack/react-query';

function Header() {
  const { isAuthenticated } = useAuth();
  const { username, userBalance, setIsAuthenticated } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => setIsAuthenticated(false),
  });

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
        justify="space-between"
      >
        <Flex align="center" ml={5}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily="heading"
            color={useColorModeValue('gray.800', 'white')}
          >
            <img src={Logo} alt="logo" width={25} height={25} />
          </Text>
          <Heading size="xs" ml={5}>
            Arithmetic Calculator
          </Heading>
        </Flex>

        <Flex direction="row" gap={5} align="center">
          {isAuthenticated ? (
            <>
              <Text fontSize="xs">balance</Text>
              <Text fontSize="sm">{userBalance}</Text>
              <Text fontSize="xs">({username})</Text>
              <Button
                as="a"
                fontSize="sm"
                fontWeight={400}
                variant="link"
                mr={5}
                onClick={logoutMutation.mutate}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="truenorth.darkBlue"
              href="#"
              mr={5}
              _hover={{
                bg: 'truenorth.blue',
              }}
            >
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;

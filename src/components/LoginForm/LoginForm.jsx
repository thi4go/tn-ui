import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { fetchLogin } from '../../queries/queries';
import { useAuth } from '../../hocs/AuthProvider';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => fetchLogin(email, password),
    onSuccess: (response) => {
      console.log(response);
      setIsAuthenticated(true);
      queryClient.refetchQueries(['session']);
    },
    onError: (error) => console.error(error),
  });

  return (
    <Box w="sm" p={8} boxShadow="md" borderRadius="lg" bg="white">
      <Flex flexDirection="column" gap={5}>
        <FormControl isInvalid={loginMutation.error}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            isInvalid={loginMutation.error}
            onChange={(e) => {
              loginMutation.reset();
              setEmail(e.target.value);
            }}
          />
          <FormErrorMessage>Invalid credentials</FormErrorMessage>
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            isInvalid={loginMutation.error}
            onChange={(e) => {
              loginMutation.reset();
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        <Button
          w="full"
          mt={5}
          color="white"
          bg="truenorth.blue"
          type="submit"
          isLoading={loginMutation.isLoading || loginMutation.isPending}
          onClick={() => loginMutation.mutate({ email, password })}
        >
          Log in
        </Button>
      </Flex>
    </Box>
  );
}

export default LoginForm;

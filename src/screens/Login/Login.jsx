import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import Layout from '../../layout/Layout';
import LoginForm from '../../components/LoginForm/LoginForm';

function LoginScreen() {
  return (
    <Layout>
      <LockIcon boxSize={'50px'} color="truenorth.blue" />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Login
      </Heading>
      <Text color={'gray.500'} mb={10}>
        Please start a user session with your credentails.
      </Text>
      <LoginForm />
    </Layout>
  );
}

export default LoginScreen;

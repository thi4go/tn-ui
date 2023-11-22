import {
  Box,
  Button,
  FormErrorMessage,
  HStack,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { fetchCreateOperations } from '../../queries/queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hocs/AuthProvider';
import {
  OP_ADD,
  OP_DIV,
  OP_MUL,
  OP_RANDOM_STRING,
  OP_SQRT,
  OP_SUB,
} from '../../constants';

function CalculatorForm() {
  const [firstNum, setFirstNum] = useState();
  const [secondNum, setSecondNum] = useState();
  const queryClient = useQueryClient();

  const { userId } = useAuth();
  const toast = useToast();

  const operationMutation = useMutation({
    mutationFn: ({ userId, type, firstNum, secondNum }) =>
      fetchCreateOperations(userId, type, firstNum, secondNum),
    onSuccess: () => {
      queryClient.invalidateQueries(['records']);
      toast({
        title: 'Operation computed',
        status: 'success',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    },
  });

  const operation = (type) =>
    operationMutation.mutate({
      type,
      userId,
      firstNum,
      secondNum,
    });

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack spacing={4}>
        <HStack spacing={4}>
          <NumberInput
            value={firstNum}
            maxW={20}
            size="sm"
            isInvalid={operationMutation.error}
            onChange={(value) => {
              operationMutation.reset();
              setFirstNum(value);
            }}
          >
            <NumberInputField inputMode="numeric" placeholder="1st" />
          </NumberInput>
          <NumberInput
            value={secondNum}
            maxW={20}
            size="sm"
            isInvalid={operationMutation.error}
            onChange={(value) => {
              operationMutation.reset();
              setSecondNum(value);
            }}
          >
            <FormErrorMessage>Invalid credentials</FormErrorMessage>
            <NumberInputField inputMode="numeric" placeholder="2nd" />
          </NumberInput>
        </HStack>
        <HStack justify="space-between" w="full">
          <CalculatorButton
            label="+"
            isLoading={
              operationMutation.isPending &&
              operationMutation.variables.type === OP_ADD
            }
            onClick={() => operation(OP_ADD)}
          />
          <CalculatorButton
            label="-"
            isLoading={
              operationMutation.isPending &&
              operationMutation.variables.type === OP_SUB
            }
            onClick={() => operation(OP_SUB)}
          />
          <CalculatorButton
            label="x"
            isLoading={
              operationMutation.isPending &&
              operationMutation.variables.type === OP_MUL
            }
            onClick={() => operation(OP_MUL)}
          />
          <CalculatorButton
            label="/"
            isLoading={
              operationMutation.isPending &&
              operationMutation.variables.type === OP_DIV
            }
            onClick={() => operation(OP_DIV)}
          />
          <CalculatorButton
            label="√"
            isLoading={
              operationMutation.isPending &&
              operationMutation.variables.type === OP_SQRT
            }
            onClick={() => operation(OP_SQRT)}
          />
        </HStack>
        <Button
          _hover={{
            bg: 'truenorth.blue',
          }}
          isLoading={
            operationMutation.isPending &&
            operationMutation.variables.type === OP_RANDOM_STRING
          }
          onClick={() => operation(OP_RANDOM_STRING)}
        >
          <Text fontSize="sm">Random String</Text>
        </Button>
      </VStack>
    </Box>
  );
}

export default CalculatorForm;

function CalculatorButton({ label, isLoading, onClick }) {
  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      _hover={{
        bg: 'truenorth.blue',
      }}
    >
      {label}
    </Button>
  );
}

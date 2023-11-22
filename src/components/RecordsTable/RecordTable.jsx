import { Box, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecords } from '../../queries/queries';
import {
  OP_ADD,
  OP_DIV,
  OP_MUL,
  OP_RANDOM_STRING,
  OP_SQRT,
  OP_SUB,
} from '../../constants';
import cloneDeep from 'lodash/cloneDeep';

function RecordTable() {
  const { data } = useQuery({
    queryKey: ['records'],
    queryFn: fetchRecords,
  });

  const records = data?.data.reverse() || [];
  const reversed = cloneDeep(records).reverse();

  return (
    <Box overflowX="auto" mt={5}>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th align="center">First Number</Th>
            <Th>Second Number</Th>
            <Th>Operation</Th>
            <Th textAlign="center">Result</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reversed.map((record, i) => (
            <Tr alignContent="center" key={i}>
              <Td>
                <Text fontSize="xs">{record.id}</Text>
              </Td>
              <Td textAlign="center">{record.Operation.first_num}</Td>
              <Td textAlign="center">{record.Operation.second_num}</Td>
              <Td textAlign="center">
                {operationToSymbol(record.Operation.type)}
              </Td>
              <Td textAlign="center">{record.Operation.result}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

function operationToSymbol(op) {
  switch (op) {
    case OP_ADD:
      return '+';
    case OP_SUB:
      return '-';
    case OP_MUL:
      return 'x';
    case OP_DIV:
      return '/';
    case OP_SQRT:
      return '√';
    case OP_RANDOM_STRING:
      return 'RS';
    default:
      return '';
  }
}

export default RecordTable;

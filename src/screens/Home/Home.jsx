import { Flex } from '@chakra-ui/react';
import Layout from '../../layout/Layout';
import CalculatorForm from '../../components/CalculatorForm/CalculatorForm';
import RecordTable from '../../components/RecordsTable/RecordTable';
import Logo from '../../images/logo.png';

function HomeScreen() {
  return (
    <Layout>
      <Flex direction="column" align="center" gap={10}>
        <img src={Logo} alt="logo" width={40} height={40} />
        <CalculatorForm />
        <RecordTable />
      </Flex>
    </Layout>
  );
}

export default HomeScreen;

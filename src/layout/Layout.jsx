import Header from './Header';
import ErrorBoundary from '../hocs/ErrorBoundary';
import Body from './Body';

function Layout({ children }) {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Body>{children}</Body>
      </ErrorBoundary>
    </>
  );
}

export default Layout;

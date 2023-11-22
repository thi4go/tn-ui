import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Login from '../screens/Login/Login';
import { fetchSession } from '../queries/queries';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    userId: '',
    username: '',
    userBalance: 0,
  });

  const { data, isSuccess } = useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(true);
      setUser({
        userId: data.userId,
        username: data.username,
        userBalance: data.userBalance,
      });
    } else {
      setUser({
        userId: '',
        username: '',
        userBalance: 0,
      });
    }
  }, [isSuccess, data]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        setUser,
        username: user.username,
        userId: user.userId,
        userBalance: user.userBalance,
      }}
    >
      {!isAuthenticated ? <Login /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

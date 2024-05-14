import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from '../utils/axios';
import { isValidToken, setSession, tokenExpired } from './utils';
import { PATH_AFTER_LOGIN, PATH_AUTH } from '../routes/paths';

const AuthContext = createContext(null);

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: session, status } = useSession();

  const isUser = !!session?.user;
  useEffect(() => {
    dispatch({
      type: 'INITIAL',
      payload: {
        isAuthenticated: isUser,
        user: session?.user ?? null,
      },
    });
  }, [isUser, session]);

  const login = useCallback(async (email, password) => {
    try {
      const result = await signIn('keycloak', { email, password, redirect: false });
      if (result?.error) {
        throw new Error(result.error);
      }
      if (result.url) {
        window.location.href = result.url;
      } else {
        window.location.href = PATH_AFTER_LOGIN;
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed: ' + error.message);
    }
  }, []);

  const logout = useCallback(() => {
    signOut({ redirect: false }).then(() => {
      window.location.href = PATH_AUTH.login;
    }).catch(error => {
      console.error('Logout error:', error);
      alert('Logout failed: ' + error.message);
    });
    dispatch({ type: 'LOGOUT' });
  }, []);

  // Verificar automáticamente el estado de la sesión cada 5 minutos
  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('accessToken');
      if (token && !isValidToken(token)) {
        logout(); // Iniciar cierre de sesión si el token ha caducado
      }
    }, 300000); // 5 minutos en milisegundos

    return () => clearInterval(intervalId);
  }, [logout]);

  const value = useMemo(() => ({
    ...state,
    method: 'keycloak',
    login,
    logout,
  }), [state, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);

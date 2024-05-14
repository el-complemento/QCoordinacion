import { createContext, useContext, useEffect, useReducer } from 'react';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';

export const AuthContext = createContext(null);

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        isLoading: action.isLoading,  // Controlar la carga basado en la acción
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

  useEffect(() => {
    dispatch({
      type: 'INITIAL',
      isAuthenticated: status === 'authenticated',
      user: {...session?.user, displayName: session?.user.name} || null,
      isLoading: status === 'loading',  // Actualizar según el estado de la sesión
    });
  }, [session, status]);

  const logout = async () => {
    dispatch({ type: 'LOGOUT' }); // Update state to reflect the user has logged out
    await nextAuthSignOut({ redirect: false }); // Use next-auth's signOut function
  };

  // Provide the logout function as part of the context value
  return (
    <AuthContext.Provider value={{ ...state, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

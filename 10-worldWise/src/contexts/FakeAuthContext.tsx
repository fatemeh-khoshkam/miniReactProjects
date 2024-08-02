import React, { createContext, useContext, useReducer } from "react";

type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

const FAKE_USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loginError: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loginError: false,
};

type Action =
  | { type: "login"; payload: User }
  | { type: "logout" }
  | { type: "rejected" };

function reducer(state: AuthState, action: Action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        loginError: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loginError: false,
      };
    case "rejected":
      return { ...state, isAuthenticated: false, loginError: true };
    default:
      throw new Error(`Unknown action type`);
  }
}

type AuthContext = AuthState & {
  logout: () => void;
  login: (password: string, email: string) => void;
};

const AuthContext = createContext<AuthContext | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated, loginError }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else
      dispatch({
        type: "rejected",
      });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loginError,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error("AuthContext was used outside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };

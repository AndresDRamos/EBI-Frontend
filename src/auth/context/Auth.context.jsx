import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  errors: [],
  signin: async () => {},
  logout: () => {},
});

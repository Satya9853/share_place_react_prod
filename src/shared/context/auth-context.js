import { createContext } from "react";

const initialState = { isLoggedIn: false, login: () => {}, logout: () => {}, userID: null, token: null };

export const AuthContext = createContext(initialState);

createContext();

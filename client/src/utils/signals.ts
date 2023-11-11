import { signal } from "@preact/signals-react";
import { createContext } from "preact";


export const username = signal("");
export const email = signal("");
export const password = signal("");
export const auth = signal({isLoggedIn: false});
export const error = signal("");

export const isLoggedIn = createContext(false);
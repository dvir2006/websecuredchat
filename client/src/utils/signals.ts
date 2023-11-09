import { signal } from "@preact/signals";


export const username = signal("");
export const email = signal("");
export const password = signal("");
export const auth = signal({isLoggedIn: false});
export const error = signal("");
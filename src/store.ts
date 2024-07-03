import { create } from 'zustand'

export const useStore = create((set) => ({
  loggedIn: false,
  logIn: () => set({ loggedIn: true }),
  logOut: () => set({ loggedIn:false}),
}))
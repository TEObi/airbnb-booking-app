"use client";

import { create } from "zustand";

type ModalType = "login" | "register" | null;

interface AuthModalStore {
  modal: ModalType;
  openLogin: () => void;
  openRegister: () => void;
  close: () => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  modal: null,
  openLogin: () => set({ modal: "login" }),
  openRegister: () => set({ modal: "register" }),
  close: () => set({ modal: null }),
}));

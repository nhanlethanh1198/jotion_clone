import {create} from 'zustand';

type WelcomeStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useWelcome = create<WelcomeStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));
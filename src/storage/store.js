import create from "zustand";

const Store = create((set) => ({
  store: [],
  add: (data) => set(() => ({ store: [data] })),
}));
export default Store;

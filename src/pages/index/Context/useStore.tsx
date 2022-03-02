import create from 'zustand';

const useStore = create((set, get, api) => ({
  count: 0,
  idx: 1,
  increasePopulation: (n) => set((state) => ({ count: n })),
  removeAllCount: () => set({ count: 0 }),
  wipeOut: () => set({}, true),
  getData: () => {
    console.log(get());
    console.log('aa');
    set({ idx: Math.random() });
  },
  getApi: () => {
    return api;
  },
}));
const useStore2 = create((set, get, api) => ({
  count: 0,
  idx: 1,
}));
console.log('useStore2', useStore === useStore2);

console.log('----', { ...useStore });

export default useStore;

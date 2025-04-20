
import { create } from 'zustand';

interface ActiveFilterState {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

const useActiveFilterStore = create<ActiveFilterState>((set) => ({
    activeFilter: '',
    setActiveFilter: (filter: string) => set({ activeFilter: filter }),
}));

export default useActiveFilterStore;

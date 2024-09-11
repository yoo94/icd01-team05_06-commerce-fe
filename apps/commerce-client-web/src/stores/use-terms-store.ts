import { create } from 'zustand';
import termsData from '../data/terms.json';

interface TermsState {
  terms: {
    privacy: string;
    service: string;
  };
  fetchTerms: () => Promise<void>;
}

const useTermsStore = create<TermsState>((set) => ({
  terms: {
    privacy: '',
    service: '',
  },
  fetchTerms: async () => {
    try {
      // TODO: Fetch terms data from the server
      // const response = await fetch('/terms');
      // const data = await response.json();
      const data = termsData;
      set({ terms: data });
    } catch (error) {
      console.error('Failed to fetch terms:', error);
    }
  },
}));

export default useTermsStore;

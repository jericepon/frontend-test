import { defineStore } from 'pinia';

export const useFeatureAStore = defineStore('featureA', {
  state: () => ({
    data: [],
    loading: false,
    error: null,
  }),
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    getData: (state) => state.data,
  },
  actions: {
    async fetchData() {
      this.loading = true;
      this.error = null;
    },
    clearData() {
      this.data = [];
    },
  },
});
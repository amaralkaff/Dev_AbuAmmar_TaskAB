export interface SearchFormData {
  query: string;
}

export const searchFormValidation = {
  query: {
    required: 'Please enter a search query',
    minLength: {
      value: 1,
      message: 'Search query cannot be empty',
    },
    validate: {
      notOnlySpaces: (value: string) =>
        value.trim().length > 0 || 'Search query cannot be only spaces',
    },
  },
};

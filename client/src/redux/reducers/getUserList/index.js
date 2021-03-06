const initState = {
    config: {
      pageSize: 9,
      pageNumber: 1,
      sortType: 0,
      searchText: '__NO_SEARCH_TEXT__',
      superiorId: '__NO_SUPERIOR_ID__'
    },
    users: [],
    error: null,
    deleteError: null,
    isLoading: false
  };
  
  const users = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'SET_USER_LIST_START':
        return { ...state, isLoading: true };
      case 'SET_USER_LIST_SUCCESS':
        state.config.pageNumber++;
        return {
          ...state,
          ...payload,
          isLoading: false
        };
      case 'INIT_USER_LIST':
        return {
          ...state,
          users: []
        };
      case 'SET_USER_LIST_ERROR':
        return { ...state, ...payload, isLoading: false };
      case 'DELETE_USER_START':
        return { ...state, isLoading: true };
      case 'DELETE_USER_ERROR':
        return { ...state, ...payload, isLoading: false };
      case 'DELETE_USER_SUCCESS':
        return {
          ...state,
          users: payload,
          isLoading: false
        };
      case 'CHANGE_SORT_TYPE':
        state.config.sortType = payload.sortType;
        state.config.pageNumber = 1;
        return state;
      case 'CHANGE_SEARCH_TEXT':
        state.config.searchText = payload.searchText;
        state.config.pageNumber = 1;
        return state;
      default:
        return state;
    }
  };
  
  export default users;
  
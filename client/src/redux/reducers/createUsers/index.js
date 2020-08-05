const initState = {
    // avatar: '',
    // name: '',
    // sex: '',
    // rank: '',
    // startdate: '',
    // phone: '',
    // email: '',
    // superior: '',
    // superiorname: '',
    error: null,
    isLoading: false,
    createSuccess: false
  };
  
  const createUser = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'CREATE_USER_START':
        return { ...state, isLoading: true };
      case 'CREATE_USER_SUCCESS':
        console.log("Success!!!!");
        return {
          ...state,
          isLoading: false,
          createSuccess: true,
          error: null // need this? or just in init?
        };
      case 'CREATE_USER_ERROR':
        return { ...state, ...payload, isLoading: false };
      case 'INIT_USER':
        return { ...state, ...payload, error: null };
      // incase fail and back with no success
      default:
        return state;
    }
  };
  
  export default createUser;
  
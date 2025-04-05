const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const login = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});

export default authReducer;

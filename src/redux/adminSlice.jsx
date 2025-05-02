const initialState = {
    users: [],
    loading: false,
    error: null
};

export const setUsers = (users) => ({ type: 'SET_USERS', payload: users });
export const toggleBlockUser = (userId) => ({ type: 'TOGGLE_USER_BLOCK', payload: userId });

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'TOGGLE_USER_BLOCK':
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === action.payload 
                        ? { ...user, isBlocked: !user.isBlocked }
                        : user
                )
            };
        default:
            return state;
    }
};

export default adminReducer;
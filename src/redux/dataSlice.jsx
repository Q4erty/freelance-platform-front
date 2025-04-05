const initialState = {
  orders: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: [...state.orders, ...action.payload],
      };

    case 'TAKE_ORDER':
      const orderIndex = state.orders.findIndex(order => order.id === action.payload.orderId);
      if (orderIndex === -1) return state;

      const updatedOrder = { 
        ...state.orders[orderIndex], 
        takenBy: action.payload.userId
      };

      return {
        ...state,
        orders: [
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex + 1),
        ],
      };

    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };

    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
};

export default dataReducer;

export const setOrders = (orders) => ({
  type: 'SET_ORDERS',
  payload: orders,
});

export const deleteOrder = (orderId) => ({
  type: 'DELETE_ORDER',
  payload: orderId,
});

export const selectOrdersByCreator = (state, creatorId) => 
  state.data.orders.filter(order => order.clientId === creatorId);

export const selectOrdersByExecutor = (state, userId) =>
  state.data.orders.filter(order => order.takenBy === userId);

export const selectAvailableOrders = (state) => 
  state.data.orders.filter(order => !order.takenBy);
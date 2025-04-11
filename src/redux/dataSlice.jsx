const initialState = {
  orders: []
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload
      };

    case 'TAKE_ORDER':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId ? { ...order, takenBy: action.payload.userId } : order
        )
      };

    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map((order) => (order.id === action.payload.id ? action.payload : order))
      };

    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload)
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
  payload: orders
});

export const updateOrder = (updatedOrder) => ({
  type: 'UPDATE_ORDER',
  payload: updatedOrder
});

export const deleteOrder = (orderId) => ({
  type: 'DELETE_ORDER',
  payload: orderId
});
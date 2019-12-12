export const create = initialState => {
  let state = initialState;
  const listeners = [];

  const setState = data => {
    state = { ...state, ...data };
    listeners.map(listener => {
      listener();
    });
  };

  const getState = () => {
    return state;
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  return {
    setState,
    getState,
    subscribe
  };
};

export default create;

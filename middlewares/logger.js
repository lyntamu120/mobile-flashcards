const logger = (store) => (next) => (action) => {
  console.group(action.type);
    console.log('The action: ', action);
    console.log('The old State: ', store.getState());
    const rstVal = next(action);
    console.log('The new State: ', store.getState());
  console.groupEnd();
  return rstVal;
}

export default logger;

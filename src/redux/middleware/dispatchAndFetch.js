export default function dipatchAndFetch(store, action, request = (state) => state) {
  store.dispatch(action);
  request(store.getState());
}

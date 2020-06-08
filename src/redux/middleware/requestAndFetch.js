export default async function dipatchAndFetch(dispatch, action, request = (response) => {}) {
  const response = await request();
  dispatch(action(response));
}

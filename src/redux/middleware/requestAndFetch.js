export default async function dipatchAndFetch(dispatch, action, request = (response) => response) {
  const response = await request();
  dispatch(action(response));
}

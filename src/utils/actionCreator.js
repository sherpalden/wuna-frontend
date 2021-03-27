export default function actionCreator(action) {
  return function (payload) {
    return {
      type: action,
      payload,
    };
  };
}

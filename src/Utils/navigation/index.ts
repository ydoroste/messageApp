const canGoBack = (navigation) => {
  let index = navigation.dangerouslyGetParent().state.index;
  return index > 0;
};


export const goBack = ({ navigation, fallback }) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    fallback();
  }
};

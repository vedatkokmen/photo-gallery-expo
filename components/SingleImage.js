import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

import { formatPhotoUri } from "../api/picsum";

const SingleImage = ({ route, navigation }) => {
  const { item } = route.params;

  const { width } = Dimensions.get("screen");
  const { height } = Dimensions.get("screen");

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: formatPhotoUri(item.id, width, height),
        }}
        style={{
          width: width,
          height: height,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleImage;

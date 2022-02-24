import React from "react";
import { Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatPhotoUri } from "../api/picsum";

const PhotoGrid = ({ photos, numColumns, onEndReached }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const size = width / numColumns;

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SingleImage", {
              item,
              size,
            });
          }}
        >
          <Image
            source={{
              width: size,
              height: size,
              uri: formatPhotoUri(item.id, size, size),
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default PhotoGrid;

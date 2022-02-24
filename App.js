import { StatusBar } from "expo-status-bar";
import React, { useEffect, useReducer, useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { getList } from "./api/picsum";
import { actionCreators, initialState, reducer } from "./reducers/photos";
import PhotoGrid from "./components/PhotoGrid";
import SingleImage from "./components/SingleImage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Gallery = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { photos, nextPage, loading, error } = state;

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading());

    try {
      const nextPhotos = await getList(nextPage);
      dispatch(actionCreators.success(nextPhotos, nextPage));
    } catch (e) {
      dispatch(actionCreators.failure());
    }
  }, [nextPage]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  // We'll show an error only if the first page fails to load
  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      );
    }
  }

  return (
    <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen
          name="SingleImage"
          component={SingleImage}
          options={({ route }) => ({ title: route.params.item.author })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

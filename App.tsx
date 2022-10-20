import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import NewsItemList from "./components/NewsItemList";

export default function App() {
  const [fontLoaded] = useFonts({
    SourceCodeRegular: require("./assets/fonts/SourceCodePro-Regular.ttf"),
    SourceCodeBold: require("./assets/fonts/SourceCodePro-Bold.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NewsItemList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

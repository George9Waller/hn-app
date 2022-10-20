import { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, Pressable } from "react-native";
import { PAGE_COUNT, TEXT_STYLES } from "./common";
import FadeInView from "./FadeInView";
import NewsItem from "./NewsItem";

export const NewsItemList = () => {
  const [topNews, setTopNews] = useState<number[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw `${response.status}: ${response.statusText}`;
        }
      })
      .then((data) => {
        setTopNews(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({
    item: { key, index },
  }: {
    item: { key: number; index: number };
  }) => <NewsItem id={key} index={index} />;

  const startIndex = (page - 1) * PAGE_COUNT;
  const maxPage = topNews ? Math.floor(topNews?.length / PAGE_COUNT) : 1;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Latest:</Text>
        <FadeInView style={styles.pageCount}>
          {page > 1 && (
            <Pressable onPress={() => setPage(page - 1)}>
              <Text style={styles.button}>-</Text>
            </Pressable>
          )}
          <Text style={{ marginLeft: 10, marginRight: 10 }}>{page}</Text>
          {page <= maxPage && (
            <Pressable onPress={() => setPage(page + 1)}>
              <Text style={styles.button}>+</Text>
            </Pressable>
          )}
        </FadeInView>
      </View>

      {loading && (
        <FadeInView>
          <Text style={styles.loading}>Loading</Text>
        </FadeInView>
      )}
      {error && (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
      <FlatList
        data={topNews
          ?.slice(startIndex, startIndex + PAGE_COUNT)
          .map((item, idx) => ({
            key: item,
            index: (page - 1) * PAGE_COUNT + idx,
          }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "#f60",
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    textAlign: "left",
    ...TEXT_STYLES,
  },
  pageCount: {
    position: "absolute",
    right: 20,
    top: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    fontFamily: "SourceCodeBold",
    fontSize: 28,
    backgroundColor: "none",
  },
  error: {
    color: "white",
    backgroundColor: "red",
    width: "100%",
    ...TEXT_STYLES,
  },
  loading: {
    backgroundColor: "yellow",
    ...TEXT_STYLES,
  },
  container: {
    width: "100%",
    height: "100%",
  },
});

export default NewsItemList;

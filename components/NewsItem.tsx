import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { TEXT_STYLES } from "./common";

interface Props {
  id: number;
  index: number;
}

interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
}

const NewsItem = ({ id, index }: Props) => {
  const [item, setItem] = useState<Story>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw `item ${id}: ${response.status}: ${response.statusText}`;
        }
      })
      .then((data: Story) => {
        setItem(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <Text style={styles.error}></Text>;
  }

  const date = new Date(item ? item.time * 1000 : "");

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.loading}>Loading...</Text>}
      {item && (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item.url);
          }}
        >
          <Text style={styles.title}>
            {index}: {item.title}
          </Text>
          <Text style={styles.score}>{item.score}</Text>
          <Text style={styles.time}>
            {date.toLocaleString(undefined, { timeStyle: "short" })}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#000045",
  },
  title: {
    ...TEXT_STYLES,
    paddingRight: 40,
    fontSize: 18,
    color: "white",
  },
  time: {
    ...TEXT_STYLES,
    color: "#6e6ef5",
  },
  score: {
    ...TEXT_STYLES,
    position: "absolute",
    right: 0,
    color: "green",
  },
  loading: {
    ...TEXT_STYLES,
    color: "yellow",
  },
  error: {
    backgroundColor: "red",
    ...TEXT_STYLES,
    color: "white",
  },
});

export default NewsItem;

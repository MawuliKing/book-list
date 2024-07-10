import BookDetails from "@/components/BookDetails";
import { Collapsible } from "@/components/Collapsible";
import { useFavoriteBooks } from "@/components/context/favorite.context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "react-native-skeletons";

export interface IBook {
  title: string;
  author_name: string[];
  publish_date: string[];
  image: string;
  first_sentence: string[];
  subject: string[];
  publisher: string[];
  language: string[];
  isbn: string[];
  ratings_average?: number;
  ratings_count?: number;
  edition_key?: string[];
  cover_edition_key?: string;
  cover_i?: string;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const HomeScreen = () => {
  const [books, setBooks] = useState<IBook[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  useEffect(() => {
    fetchBooks();
  }, [debouncedSearchQuery]);
  const fetchBooks = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${debouncedSearchQuery}&limit=10`
      );
      const result = await response.json();
      // console.log(result.docs[0]);
      setBooks(result.docs);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };
  const [currentBook, setCurrentBook] = useState<IBook>();

  const { addBookToFavorites, removeBookFromFavorites, isBookInFavorites } =
    useFavoriteBooks();

  return currentBook ? (
    <BookDetails currentBook={currentBook} setCurrentBook={setCurrentBook} />
  ) : (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {!searchQuery ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Please enter a search query, to search for book</Text>
        </View>
      ) : loading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                // alignItems: "top",
              }}
            >
              <Skeleton
                count={1}
                width={"30%"}
                height={160}
                color={"#b5b5b5"}
                borderRadius={10}
                style={{ marginBottom: 10, marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Skeleton
                  count={3}
                  color={"#b5b5b5"}
                  width={"100%"}
                  height={20}
                  style={{ marginBottom: 5 }}
                />
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Image
                source={{
                  uri: item.cover_i
                    ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
                    : "https://via.placeholder.com/500X500",
                }}
                alt="Book cover"
                style={styles.bookImage}
              />
              <View style={styles.cardContent}>
                <View>
                  <TouchableOpacity onPress={() => setCurrentBook(item)}>
                    <Text style={styles.bookTitle}>{item.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.bookAuthor}>
                    {item.author_name?.[0] ?? "N/A"}
                  </Text>
                </View>
                <View style={styles.cardActions}>
                  <Text>
                    {item.publish_date?.[item.publish_date.length - 1]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (isBookInFavorites(item.isbn?.[0])) {
                        removeBookFromFavorites(item.isbn?.[0]);
                      } else {
                        addBookToFavorites(item);
                      }
                    }}
                    style={styles.iconButton}
                  >
                    <TabBarIcon
                      name={
                        isBookInFavorites(item.isbn?.[0])
                          ? "heart"
                          : "heart-outline"
                      }
                      color={"red"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  card: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 10,
  },
  bookImage: {
    width: 100,
    height: 160,
    borderRadius: 10,
    marginRight: 10,
    objectFit: "cover",
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 18,
  },
  bookAuthor: {
    fontSize: 14,
    marginTop: 5,
  },
  iconButton: {
    padding: 10,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export default HomeScreen;

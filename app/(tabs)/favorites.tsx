import { useFavoriteBooks } from "@/components/context/favorite.context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useNavigation } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const {
    favoriteBooks,
    addBookToFavorites,
    removeBookFromFavorites,
    isBookInFavorites,
  } = useFavoriteBooks();

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <FlatList
        data={favoriteBooks}
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
                <TouchableOpacity
                  onPress={() => {
                    navigation
                      .getParent()
                      ?.navigate("book-details", { book: item });
                  }}
                >
                  <Text style={styles.bookTitle}>{item.title}</Text>
                </TouchableOpacity>
                <Text style={styles.bookAuthor}>
                  {item.author_name?.[0] ?? "N/A"}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <Text>{item.publish_date?.[item.publish_date.length - 1]}</Text>
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
    </SafeAreaView>
  );
}

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

import { IBook } from "@/app/(tabs)";
import { Collapsible } from "@/components/Collapsible";
import { useFavoriteBooks } from "@/components/context/favorite.context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const BookDetails: React.FC = () => {
  const route: any = useRoute();
  const currentBook: IBook = route.params?.book;
  const { addBookToFavorites, removeBookFromFavorites, isBookInFavorites } =
    useFavoriteBooks();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#D0D0D0" }}
      headerImage={
        <Image
          source={{
            uri: currentBook.cover_i
              ? `https://covers.openlibrary.org/b/id/${currentBook.cover_i}-L.jpg`
              : "https://via.placeholder.com/500X500",
          }}
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.titleContainer}>
        <ThemedText type="title">{currentBook.title}</ThemedText>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText>
          {currentBook.author_name?.[0] ?? "N/A"} -{" "}
          {currentBook.publish_date?.[0]}
        </ThemedText>

        <TouchableOpacity
          onPress={() => {
            if (isBookInFavorites(currentBook.isbn?.[0])) {
              removeBookFromFavorites(currentBook.isbn?.[0]);
            } else {
              addBookToFavorites(currentBook);
            }
          }}
          style={styles.iconButton}
        >
          <TabBarIcon
            name={
              isBookInFavorites(currentBook.isbn?.[0])
                ? "heart"
                : "heart-outline"
            }
            color={"red"}
          />
        </TouchableOpacity>
      </View>

      <Collapsible title="Publishers">
        {currentBook?.publisher?.length > 0 ? (
          currentBook.publisher?.map((publisher, index) => (
            <ThemedText key={index} style={{ marginBottom: 5 }}>
              {index + 1}. {publisher}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No publishers available</ThemedText>
        )}
      </Collapsible>
      <Collapsible title="Languages">
        {currentBook?.language?.length > 0 ? (
          <ThemedText style={{ marginBottom: 10 }}>
            {currentBook.language?.map((language) => language).join(", ")}
          </ThemedText>
        ) : (
          <ThemedText>No languages available</ThemedText>
        )}
      </Collapsible>
      <Collapsible title="Subjects">
        {currentBook?.subject?.length > 0 ? (
          currentBook.subject?.map((sentence, index) => (
            <ThemedText key={index} style={{ marginBottom: 5 }}>
              {index + 1}. {sentence}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No Subjects available</ThemedText>
        )}
      </Collapsible>
      <Collapsible title="First sentence">
        {currentBook?.first_sentence?.length > 0 ? (
          currentBook.first_sentence?.map((sentence, index) => (
            <ThemedText key={index} style={{ marginBottom: 10 }}>
              {sentence}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No first sentence available</ThemedText>
        )}
      </Collapsible>
      <Collapsible title="ISBN">
        {currentBook?.isbn?.length > 0 ? (
          <ThemedText style={{ marginBottom: 10 }}>
            {currentBook.isbn?.map((isbn, index) => isbn).join(", ")}
          </ThemedText>
        ) : (
          <ThemedText>No ISBN available</ThemedText>
        )}
      </Collapsible>
    </ParallaxScrollView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  iconButton: {
    padding: 10,
  },
  headerImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

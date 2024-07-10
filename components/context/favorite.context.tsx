import { IBook } from "@/app/(tabs)";
import React, { createContext, useContext, useState } from "react";

const FavoriteBooksContext = createContext<any>([]);

export const useFavoriteBooks = () => {
  return useContext(FavoriteBooksContext);
};

export const FavoriteBooksProvider = ({ children }: any) => {
  const [favoriteBooks, setFavoriteBooks] = useState<IBook[]>([]);

  const addBookToFavorites = (book: IBook) => {
    setFavoriteBooks((prevFavorites) => [...prevFavorites, book]);
  };

  const removeBookFromFavorites = (isbn: string) => {
    setFavoriteBooks((prevFavorites) =>
      prevFavorites.filter((book) => !book.isbn.includes(isbn))
    );
  };

  const isBookInFavorites = (isbn: string) => {
    return favoriteBooks.some((book) => book.isbn.includes(isbn));
  };

  return (
    <FavoriteBooksContext.Provider
      value={{
        favoriteBooks,
        addBookToFavorites,
        removeBookFromFavorites,
        isBookInFavorites,
      }}
    >
      {children}
    </FavoriteBooksContext.Provider>
  );
};

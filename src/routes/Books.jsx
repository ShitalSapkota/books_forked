import { useEffect, useState } from "react";
import useAxios from "../services/useAxios";

import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// for Books: to store and fetch data
function Books() {
  const [books, setBooks] = useState([]); // to push data into the books array
  const [isLoading, setIsLoading] = useState(true); // to check true or false as it is loading or not.
  const { data, get } = useAxios("http://localhost:3000");

  const [searchBook, setSearchBook] = useState(""); // for searching book
  const [filteredBooks, setFilteredBooks] = useState([]); // to filtered books by genres
  const navigate = useNavigate();

  useEffect(() => {
    if (books.length === 0) {
      getBooks(); // calling the function
    }
  }, []);

  // TODO: Replace axios with useAxios hook : DONE
  // calling data from custom hooks
  async function getBooks() {
    try {
      await get("books");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (data) {
      setBooks(data);
      setFilteredBooks(data);
      setIsLoading(false);
    }
  }, [data]);

  // TODO: Implement search functionality : DONE
  useEffect(() => {
    if (searchBook.trim()) {
      const result = books.filter(
        (book) =>
          book.name.toLowerCase().includes(searchBook.toLowerCase()) ||
          book.genres.some((genre) =>
            genre.toLowerCase().includes(searchBook.toLowerCase())
          ) ||
          book.author.toLowerCase().includes(searchBook.toLowerCase())
      );
      setFilteredBooks(result);
    } else {
      setFilteredBooks(books);
    }
  }, [searchBook, books]);

  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <div>
          <TextField
            label="Search by title, author or genre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
          />
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15%",
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    mt: "auto",
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button
                    size="small"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;

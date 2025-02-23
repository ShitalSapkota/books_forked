import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import { DateField } from "@mui/x-date-pickers/DateField";
import useAxios from "../services/useAxios";
import { bookGenres } from "../genres";
import { Stack, Typography } from "@mui/material";

// AddBook function: focusing on required input fields for the books using state and and other event handler functions.

function AddBook() {
  const { alert, post } = useAxios("http://localhost:3000");
  const [book, setBook] = useState({
    author: "",
    name: "",
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

  const [errors, setErrors] = useState({});

  // using default image if img url empty
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Validate Textfields
  const validate = () => {
    let tempErrors = {};
    tempErrors.name = book.name ? "" : "This field is required.";
    tempErrors.author = book.author ? "" : "This field is required.";
    tempErrors.genres = book.genres.length ? "" : "This field is required.";
    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  // event handling for genres
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === "string" ? value.split(",") : value,
    });
  };

  // event handling for books rating
  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  //event handling for adding all the values into the BOOK.
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox" && name === "completed") {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  // form submission handler
  function postHandler(e) {
    e.preventDefault();
    if (validate()) {
      const bookData = {
        ...book,
        img: book.img || defaultImageUrl,
      };
      try {
        post("books", bookData);
      } catch (error) {
        console.error(error);
      }
      // reset
      setBook({
        author: "",
        name: "",
        genres: [],
        completed: false,
        start: null,
        end: null,
        stars: null,
      });
    }
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: "auto", width: "25%" }}
      >
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
          error={!!errors.author}
          helperText={errors.author}
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          error={!!errors.genres}
          helperText={errors.genres}
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          {/* Fix Rating component mouseover */}
          <Rating
            name="stars"
            value={+book.stars}
            onChange={rateChangeHandler}
            size="large"
            precision={1}
          />
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;

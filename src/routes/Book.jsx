// the book details will be called here..
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../services/useAxios";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";

function Book() {
  const { id } = useParams();
  const { get, data } = useAxios(`http://localhost:3000/books`);

  useEffect(() => {
    get(`/${id}`);
  }, [data]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ padding: "20px", margin: "20px" }}
    >
      {data ? (
        <Box
          sx={{
            width: "40vw",
            height: "40vh",
            borderRadius: 1,
          }}
        >
          <Box>
            <Typography variant="h4">{data.name}</Typography>
            <Box>
              <img
                src={`${data.img}`}
                alt={data.name}
                style={{ maxWidth: "100%" }}
              />
            </Box>
            <Stack direction="row" spacing={1} mt={2}>
              {data.genres.map((genre) => (
                <Chip key={genre} label={genre} />
              ))}
            </Stack>
          </Box>
          <hr />
          <Box>
            <Box>
              <Typography variant="body1">
                <strong>Author:</strong> {data.author}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}

export default Book;

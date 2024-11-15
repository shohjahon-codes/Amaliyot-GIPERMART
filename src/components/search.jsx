import React, { useEffect, useState } from "react";
import { SearchIcon } from "../assets/icon/search-icon";


import { useLocation } from "react-router-dom";
import { Box, TextField, IconButton, CircularProgress, Paper } from "@mui/material";

export const Search = () => {
  const [input, setInput] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    setInput("");
  }, [pathname]);

  let search = useDebounce(input);
  if (search.length <= 2) {
    search = "";
  }

  const { data, isLoading } = useGetAllDataQuery(search);

  return (
    <Box position="relative" width="100%">
      <Box
        component="form"
        sx={{
          position: "relative",
          width: "100%",
        }}
        autoComplete="off"
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Поиск"
          aria-label="Поиск"
          fullWidth
          variant="outlined"
          size="medium"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && data?.length ? (
        <Paper
          sx={{
            position: "absolute",
            zIndex: 50,
            maxHeight: "250px",
            overflowY: "scroll",
            width: "100%",
            mt: 1,
            p: 1,
          }}
        >
          {data.map((item) => (
            <SearchCard key={item.id} {...item} />
          ))}
        </Paper>
      ) : null}
    </Box>
  );
};

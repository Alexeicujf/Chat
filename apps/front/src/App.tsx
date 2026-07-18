import { Button, Container, Typography, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0); // Убрали any, поставили number!

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Добро пожаловать в Chat!
        </Typography>

        <Typography variant="body1">Кликнули: {count} раз</Typography>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleIncrement}
        >
          Тестовая кнопка MUI
        </Button>
      </Box>
    </Container>
  );
}

export default App;

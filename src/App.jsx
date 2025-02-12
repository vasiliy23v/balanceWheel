import { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import html2canvas from "html2canvas";
import {
  Container,
  TextField,
  Button,
  IconButton,
  Typography,
  Stack,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Стили для TextField
const customTextFieldStyle = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Белый фон с легкой прозрачностью
    marginBottom: "10px"
  },
  "& .MuiOutlinedInput-root:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)", // Белый фон при наведении
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Усиление тени при наведении
  },
  "& .MuiInputLabel-root": {
    color: "#333", // Цвет метки
    transition: "all 0.3s ease", // Плавное изменение
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root": {
    color: "#3f51b5", // Цвет метки при фокусе
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3f51b5", // Цвет границы при фокусе
    boxShadow: "0 0 5px rgba(63, 81, 181, 0.5)", // Легкое свечение вокруг поля
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "1rem", // Размер шрифта внутри поля
    color: "#333", // Цвет текста
    padding: "12px", // Паддинг для удобства ввода
  },
};

const BalanceWheel = () => {
  const [labels, setLabels] = useState(["Здоровье", "Карьера", "Финансы", "Отношения", "Развитие"]);
  const [values, setValues] = useState([5, 7, 6, 8, 4]);
  const [color, setColor] = useState("rgba(54, 162, 235, 0.5)");

  const handleLabelChange = (index, value) => {
    setLabels((prev) => prev.map((label, i) => (i === index ? value : label)));
  };

  const handleValueChange = (index, value) => {
    setValues((prev) => prev.map((val, i) => (i === index ? Number(value) || 0 : val)));
  };

  const addAxis = () => {
    setLabels([...labels, "Новая сфера"]);
    setValues([...values, 0]);
  };

  const removeAxis = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
    setValues(values.filter((_, i) => i !== index));
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Уровень удовлетворенности",
        data: values,
        backgroundColor: color,
        borderColor: color.replace("0.5", "1"),
        borderWidth: 1,
      },
    ],
  };

  const exportToImage = async () => {
    const chartElement = document.getElementById("chart-container");
    if (!chartElement) return;
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "balance_wheel.png";
    link.click();
  };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Колесо Баланса
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="center" justifyContent="center">
        <Box>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel>Выберите цвет</InputLabel>
            <Select value={color} onChange={handleColorChange}>
              <MenuItem value="rgba(54, 162, 235, 0.5)">Синий</MenuItem>
              <MenuItem value="rgba(255, 99, 132, 0.5)">Розовый</MenuItem>
              <MenuItem value="rgba(75, 192, 192, 0.5)">Бирюзовый</MenuItem>
              <MenuItem value="rgba(255, 159, 64, 0.5)">Оранжевый</MenuItem>
              <MenuItem value="rgba(153, 102, 255, 0.5)">Фиолетовый</MenuItem>
              <MenuItem value="rgba(255, 205, 86, 0.5)">Желтый</MenuItem>
            </Select>
          </FormControl>
          {labels.map((label, index) => (
            <Stack direction="row" spacing={1} alignItems="center" key={index}>
              <TextField
                label={`Сфера ${index + 1}`}
                value={label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                fullWidth
                sx={customTextFieldStyle} // Применяем стили
              />
              <TextField
                type="number"
                label="Уровень"
                value={values[index]}
                onChange={(e) => handleValueChange(index, e.target.value)}
                inputProps={{ min: 0, max: 10 }}
                fullWidth
                sx={customTextFieldStyle} // Применяем стили
              />
              <IconButton onClick={() => removeAxis(index)} color="error">
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button onClick={addAxis} startIcon={<Add />} variant="contained" style={{ marginTop: "10px" }}>
            Добавить сферу
          </Button>


        </Box>
        <Box id="chart-container" style={{ width: 400, height: 400 }}>
          <Radar data={data} options={{ scales: { r: { suggestedMin: 0, suggestedMax: 10 } } }} />
        </Box>
      </Stack>
      <Button onClick={exportToImage} variant="contained" style={{ marginTop: "20px" }}>
        Сохранить как изображение
      </Button>
    </Container>
  );
};

export default BalanceWheel;

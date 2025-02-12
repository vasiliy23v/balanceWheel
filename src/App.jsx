import { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement, // Для PolarArea
} from "chart.js";
import { Radar, PolarArea } from "react-chartjs-2"; // Импортируем оба компонента
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
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";


ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

// Стили для TextField
const customTextFieldStyle = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: "10px",
  },
  "& .MuiOutlinedInput-root:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputLabel-root": {
    color: "#333",
    transition: "all 0.3s ease",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiInputLabel-root": {
    color: "#3f51b5",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3f51b5",
    boxShadow: "0 0 5px rgba(63, 81, 181, 0.5)",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "1rem",
    color: "#333",
    padding: "12px",
  },
};
const BalanceWheel = () => {
  const { t } = useTranslation(); // Get the translation function

  const [labels, setLabels] = useState([t("sphere") + " 1", t("sphere") + " 2", t("sphere") + " 3", t("sphere") + " 4", t("sphere") + " 5"]);
  const [values, setValues] = useState([5, 7, 6, 8, 4]);
  const [color, setColor] = useState("rgba(54, 162, 235, 0.5)");
  const [chartType, setChartType] = useState("Radar");

  const handleLabelChange = (index, value) => {
    setLabels((prev) => prev.map((label, i) => (i === index ? value : label)));
  };

  const handleValueChange = (index, value) => {
    setValues((prev) => prev.map((val, i) => (i === index ? Number(value) || 0 : val)));
  };

  const addAxis = () => {
    setLabels([...labels, t("sphere") + " " + (labels.length + 1)]);
    setValues([...values, 0]);
  };

  const removeAxis = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
    setValues(values.filter((_, i) => i !== index));
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const data = {
    labels,
    datasets: [
      {
        label: t("level"),
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

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {t("balanceWheel")}
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="center" justifyContent="center">
        <Box>
          <Stack spacing={{ xs: "5px", md: 2 }} direction={"row"} marginBottom={ 1 } >
            <FormControl fullWidth>
              <InputLabel>{t("selectColor")}</InputLabel>
              <Select value={color} onChange={handleColorChange}>
                <MenuItem value="rgba(54, 162, 235, 0.5)">{t("blue")}</MenuItem>
                <MenuItem value="rgba(255, 99, 132, 0.5)">{t("pink")}</MenuItem>
                <MenuItem value="rgba(75, 192, 192, 0.5)">{t("turquoise")}</MenuItem>
                <MenuItem value="rgba(255, 159, 64, 0.5)">{t("orange")}</MenuItem>
                <MenuItem value="rgba(153, 102, 255, 0.5)">{t("purple")}</MenuItem>
                <MenuItem value="rgba(255, 205, 86, 0.5)">{t("yellow")}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>{t("selectChartType")}</InputLabel>
              <Select value={chartType} onChange={handleChartTypeChange}>
                <MenuItem value="Radar">Radar</MenuItem>
                <MenuItem value="PolarArea">Polar Area</MenuItem>
              </Select>
            </FormControl>
            <LanguageSwitcher />
          </Stack>

          {labels.map((label, index) => (
            <Stack direction="row" spacing={1} alignItems="center" key={index}>
              <TextField
                label={`${t("sphere")} ${index + 1}`}
                value={label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                fullWidth
                sx={customTextFieldStyle}
              />
              <TextField
                type="number"
                label={t("level")}
                value={values[index]}
                onChange={(e) => handleValueChange(index, e.target.value)}
                inputProps={{ min: 0, max: 10 }}
                fullWidth
                sx={customTextFieldStyle}
              />
              <IconButton onClick={() => removeAxis(index)} color="error">
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Stack>
          <Button onClick={addAxis} startIcon={<Add />} variant="contained" style={{ marginTop: "10px", backgroundColor: color }}>
            {t("addAxis")}
          </Button>
          <Button onClick={exportToImage} variant="contained" style={{ marginTop: "20px", backgroundColor: color }}>
            {t("saveImage")}
          </Button>
          </Stack>
        </Box>
        <Box id="chart-container" style={{ width: 400, height: 400 }}>
          {chartType === "Radar" ? <Radar data={data} options={{ scales: { r: { suggestedMin: 0, suggestedMax: 10 } } }} /> : <PolarArea data={data} options={options} />}
        </Box>
      </Stack>

    </Container>
  );
};

export default BalanceWheel;
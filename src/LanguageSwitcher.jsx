import { useState } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import Flag from "react-world-flags"; // Библиотека для флагов
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation(); // Get the t function for translations
  const [currentLang, setCurrentLang] = useState(i18n.language || "uk"); // Set default language based on i18n

  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <FormControl fullWidth style={{ minWidth: 120 }}>
      <Select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        // Translate the label for select
      >
        <MenuItem value="uk">
          <Flag code="UA" style={{ width: "24px", height: "16px", marginRight: "10px" }} />
          {t("ukrainian")} {/* Translated text for Ukrainian */}
        </MenuItem>
        <MenuItem value="ru">
          <Flag code="RU" style={{ width: "24px", height: "16px", marginRight: "10px" }} />
          {t("russian")} {/* Translated text for Russian */}
        </MenuItem>
        <MenuItem value="en">
          <Flag code="US" style={{ width: "24px", height: "16px", marginRight: "10px" }} />
          {t("english")} {/* Translated text for English */}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;

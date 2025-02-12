import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
    uk: {
        translation: {
            "balanceWheel": "Колесо Балансу",
            "selectColor": "Виберіть колір",
            "selectChartType": "Виберіть тип діаграми",
            "addAxis": "Додати сферу",
            "level": "Рівень",
            "saveImage": "Зберегти як зображення",
            "blue": "Синій",
            "pink": "Рожевий",
            "turquoise": "Бірюзовий",
            "orange": "Оранжевий",
            "purple": "Фіолетовий",
            "yellow": "Жовтий",
            "sphere": "Сфера",
            "language": "Мова",
            "ukrainian": "Українська",
            "russian": "Російська",
            "english": "Англійська"
        },
    },
    en: {
        translation: {
            "balanceWheel": "Balance Wheel",
            "selectColor": "Select color",
            "selectChartType": "Select chart type",
            "addAxis": "Add sphere",
            "level": "Level",
            "saveImage": "Save as image",
            "blue": "Blue",
            "pink": "Pink",
            "turquoise": "Turquoise",
            "orange": "Orange",
            "purple": "Purple",
            "yellow": "Yellow",
            "sphere": "Sphere",
            "language": "Language",
            "ukrainian": "Ukrainian",
            "russian": "Russian",
            "english": "English"
        },
    },
    ru: {
        translation: {
            "balanceWheel": "Колесо Баланса",
            "selectColor": "Выберите цвет",
            "selectChartType": "Выберите тип диаграммы",
            "addAxis": "Добавить сферу",
            "level": "Уровень",
            "saveImage": "Сохранить как изображение",
            "blue": "Синий",
            "pink": "Розовый",
            "turquoise": "Бирюзовый",
            "orange": "Оранжевый",
            "purple": "Фиолетовый",
            "yellow": "Желтый",
            "sphere": "Сфера",
            "language": "Язык",
            "ukrainian": "Украинский",
            "russian": "Русский",
            "english": "Английский"
        },
    },
};

i18n
    .use(LanguageDetector) // Detect user language
    .use(initReactI18next) // Initialize i18next with react-i18next
    .init({
        resources,
        lng: "uk", // Default language is Ukrainian
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  EN: {
    translation: {
      home: "Home",
        homeText: "",
      chat: "Bot Chat",
        fetchFail: "Failed to fetch messages",
        sendFail: "Failed to send message",
        backendRun: "Make sure your backend is running on ",
      rights: "Know Your Rights",
      form: "Help Form",
      language: "Language",
    },
  },
  ES: {
    translation: {
      home: "Inicio",
        homeText: "",
      chat: "Chat del Bot",
        fetchFail: "Error al obtener los mensajes",
        sendFail: "Error al enviar el mensaje",
        backendRun: "Asegúrese de que su backend esté ejecutándose en ",
      rights: "Conoce Tus Derechos",
      form: "Formulario de Ayuda",
      language: "Idioma",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "EN", // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
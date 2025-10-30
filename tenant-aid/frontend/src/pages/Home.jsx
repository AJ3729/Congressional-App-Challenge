import React from "react";
import "../css/Home.css";
import { useTranslation } from "react-i18next";

function Home() {
  const {t,i18n} = useTranslation();
  return (
    <div className="home" dangerouslySetInnerHTML={{__html: t("homeText") }}>
    </div>
  );
}

export default Home;

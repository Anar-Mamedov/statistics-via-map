// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./ui/layout/footer/Footer";
import Header from "./ui/layout/header/Header";
import SurveysPage from "./ui/page/surveys/SurveysPage";
import NewSurvey from "./ui/page/surveys/ui/new-survey/NewSurvey"; // Import your new page component
import ViewSurvey from "./ui/page/surveys/ui/view-survey/ViewSurvey";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<SurveysPage />} />
            <Route path="newsurvey" element={<NewSurvey />} />
            <Route path="viewsurvey" element={<ViewSurvey />} />
          </Routes>
          <Footer />
        </>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;

export const ThemeContext = React.createContext();

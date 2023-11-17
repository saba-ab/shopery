import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Main from "./components/Main";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProductPage from "./pages/ProductPage";

function App() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const setCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <Header category={selectedCategory} />
      <Routes>
        <Route path="/" element={<Main setCategory={setCategory} />} />
        <Route path="/:productId" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

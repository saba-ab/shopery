import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const setCategory = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className="App">
      <Header category={selectedCategory} />
      <Main setCategory={setCategory} />
    </div>
  );
}

export default App;

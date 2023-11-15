import React, { ChangeEvent } from "react";
import "../styles/categories.scss";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
interface Props {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onPriceChange: (price: number[]) => void;
}

const Categories = ({ categories, onCategoryChange, onPriceChange }: Props) => {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const newValueArray = newValue as number[];
    setValue(newValueArray);
    onPriceChange(newValueArray);
  };
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCategoryChange(event.target.value);
  };

  return (
    <div className="filter-wrapper">
      <div className="filter">
        <h3>All categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <label>
                <input
                  type="radio"
                  value={category}
                  name="category"
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="slider">
        <h3 style={{ fontSize: "22px", marginTop: "20px" }}>Price range : </h3>
        <Box sx={{ width: 250 }}>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
        </Box>
      </div>
    </div>
  );
};

export default Categories;

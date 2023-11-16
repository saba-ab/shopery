import React, { ChangeEvent } from "react";
import "../styles/categories.scss";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ProductInterface from "../interfaces/ProductInterface";
interface Props {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onPriceChange: (price: number[]) => void;
  defaultValue: number[];
  clearFilter: () => void;
  products: ProductInterface[];
  findExtremePrices: (products: ProductInterface[]) => {
    lowestPrice: number;
    highestPrice: number;
  };
  priceRange: number[];
}

const Categories = ({
  categories,
  onCategoryChange,
  onPriceChange,
  defaultValue,
  clearFilter,
  products,
  findExtremePrices,
  priceRange,
}: Props) => {
  const [value, setValue] = React.useState<number[]>([0, 1000]);

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
            min={priceRange[0]}
            max={priceRange[1]}
            defaultValue={[
              findExtremePrices(products).lowestPrice,
              findExtremePrices(products).highestPrice,
            ]}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
        </Box>
      </div>
      <div className="clear-filter">
        <button onClick={clearFilter}>Clear Filter</button>
      </div>
    </div>
  );
};

export default Categories;

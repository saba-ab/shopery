import React, { ChangeEvent } from "react";
import "../styles/categories.scss";
interface Props {
  categories: string[];
  onCategoryChange: (category: string) => void;
}

const Categories = ({ categories, onCategoryChange }: Props) => {
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
    </div>
  );
};

export default Categories;

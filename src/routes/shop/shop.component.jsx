import { Fragment, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

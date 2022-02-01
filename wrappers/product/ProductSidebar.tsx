import PropTypes from "prop-types";
import React, {useEffect} from "react";
import ShopCategories from "../../components/product/ProductCategories";
import ShopTag from "../../components/product/ProductTag";
import { useSelector } from "react-redux";
import {RootState} from "../../redux/store";

const ShopSidebar = ({ getSortParams, sideSpaceClass }) => {

  const uniqueCategories = useSelector((state: RootState) => state.commonData.categories);
  const uniqueTags = useSelector((state: RootState) => state.commonData.tags);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}

      {/* filter by categories */}
      {uniqueCategories && uniqueCategories.length > 0 && <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />}
      

      {/* filter by tag */}
      {uniqueTags && uniqueTags.length > 0 && 
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> }
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;

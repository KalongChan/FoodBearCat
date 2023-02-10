import {Fragment, useState} from "react";
import classes from "./Menu.module.css";
import Container from "../../UI/Container/Container";
import Food from "../Food/Food";

const Menu = ({menus, categories}) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredMenu, setFilteredMenu] = useState([]);

  const selectCategoryHandler = (category) => {
    if (category === "all") {
      setActiveCategory("all");
      return;
    }
    setActiveCategory(category);
    filterMenu(category);
  };

  const filterMenu = (category) => {
    setFilteredMenu(menus.filter((menu) => menu.category === category));
  };

  return (
    <Fragment>
      <div className={classes.menu} id="menu">
        <Container>
          <h2>Menu</h2>

          {/* Category Buttons */}
          <div className={classes.categories}>
            <button
              className={`${activeCategory === "all" ? classes.active : ""}`}
              onClick={() => selectCategoryHandler("all")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                className={`${
                  activeCategory === category.name ? classes.active : ""
                }`}
                onClick={() => selectCategoryHandler(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Food Menu */}
          <div className={classes.foods}>
            {(activeCategory === "all" ? menus : filteredMenu)?.map((menu) => (
              <Food
                key={menu._id}
                _id={menu._id}
                name={menu.name}
                category={menu.category}
                description={menu.description}
                price={menu.price}
                image={menu.image}
              />
            ))}
          </div>
        </Container>
      </div>
    </Fragment>
  );
};
export default Menu;

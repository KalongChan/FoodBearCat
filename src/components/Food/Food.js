import classes from "./Food.module.css";
import Image from "next/image";
import Card from "../../UI/Card/Card";
import Fade from "react-reveal/Fade";

import {useDispatch} from "react-redux";
import {addToCart} from "../../store/cartSlice";
import {useState} from "react";

const Food = ({_id, name, category, description, price, image}) => {
  const [btnAnimation, setBtnAnimation] = useState(false);
  const dispatch = useDispatch();
  const addItemToCartHandler = () => {
    dispatch(
      addToCart({
        _id,
        name,
        category,
        description,
        price,
        image,
        quantity: 1,
      })
    );

    setBtnAnimation(true);
    setTimeout(() => {
      setBtnAnimation(false);
    }, 300);
  };

  return (
    <Fade>
      <Card key={_id}>
        <div className={classes["menu-category"]}>{category}</div>

        <div className={classes["image-wrapper"]}>
          <Image
            src={image}
            alt=""
            height={300}
            width={300}
            className={classes.image}
          ></Image>
        </div>
        <div className={classes["menu-desc"]}>
          <span>{name}</span>
          <span>{`$${price}`}</span>
        </div>
        <button
          className={`${classes["menu-button"]} ${
            btnAnimation ? classes.bump : ""
          }`}
          onClick={addItemToCartHandler}
        >
          Add to Cart
        </button>
      </Card>
    </Fade>
  );
};
export default Food;

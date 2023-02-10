import classes from "./Food.module.css";
import Image from "next/image";
import Card from "../../UI/Card/Card";
import {Fade} from "react-awesome-reveal";
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
    <Card key={_id}>
      <Fade>
        <div className={classes["menu-category"]}>{category}</div>

        <Image
          // src={`/img/Menu/${index}.jpg`}
          src="/img/delivery_jitensya.png"
          alt=""
          height={400}
          width={400}
          layout="responsive"
          // style={{objectFit: "cover"}}
        ></Image>
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
      </Fade>
    </Card>
  );
};
export default Food;

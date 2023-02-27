import Container from "@/UI/Container/Container";
import classes from "./CustomerReviews.module.css";

const CustomerReviews = () => {
  return (
    <div className={classes["customer-reviews"]}>
      <Container>
        <div className={classes["customer-title"]}>Our Customers Love Us</div>
        <div className={classes["reviews"]}>
          <div className={classes["review"]}>
            <div className={classes["review-text"]}>
              Good morning, China. Now I have bing chilling. I like bing
              chilling very much, but "Fast and Furious 9" is better than bing
              chilling. 🍦
            </div>
            <div className={classes["reviewer"]}>
              <div className={classes["reviewer-image"]}>
                <img src="img/Customer/johncena.png" alt="" />
              </div>
              <div className={classes["reviewer-name"]}>John Cena</div>
            </div>
          </div>
          <div className={classes["review"]}>
            <div className={classes["review-text"]}>
              I need guns — lots of guns.
            </div>
            <div className={classes["reviewer"]}>
              <div className={classes["reviewer-image"]}>
                <img src="img/Customer/johnwick.png" alt="" />
              </div>
              <div className={classes["reviewer-name"]}>John Wick</div>
            </div>
          </div>
          <div className={classes["review"]}>
            <div className={classes["review-text"]}>
              If someone were to harm my family or a friend or somebody I love,
              I would eat them. I might end up in jail for 500 years, but I
              would eat them.
            </div>
            <div className={classes["reviewer"]}>
              <div className={classes["reviewer-image"]}>
                <img src="img/Customer/johnnydepp.png" alt="" />
              </div>
              <div className={classes["reviewer-name"]}>Johnny Depp</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default CustomerReviews;

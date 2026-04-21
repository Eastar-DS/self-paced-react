import categoryAsianIcon from "../assets/images/category-asian.png";
import categoryChineseIcon from "../assets/images/category-chinese.png";
import categoryEtcIcon from "../assets/images/category-etc.png";
import categoryJapaneseIcon from "../assets/images/category-japanese.png";
import categoryKoreanIcon from "../assets/images/category-korean.png";
import categoryWesternIcon from "../assets/images/category-western.png";

const categoryIcons = {
  한식: categoryKoreanIcon,
  중식: categoryChineseIcon,
  일식: categoryJapaneseIcon,
  양식: categoryWesternIcon,
  아시안: categoryAsianIcon,
  기타: categoryEtcIcon,
};

const RestaurantList = ({ restaurants }) => {
  return (
    <section className="restaurant-list-container">
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => {
          return (
            <li key={restaurant.id} className="restaurant">
              <div className="restaurant__category">
                <img
                  src={categoryIcons[restaurant.category]}
                  alt={restaurant.category}
                  className="category-icon"
                />
              </div>
              <div className="restaurant__info">
                <h3 className="restaurant__name text-subtitle">
                  {restaurant.name}
                </h3>
                <p className="restaurant__description text-body">
                  {restaurant.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RestaurantList;

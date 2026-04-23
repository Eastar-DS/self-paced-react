import { Restaurant } from "../types";
import Modal from "./Modal";

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const RestaurantDetailModal = ({
  restaurant,
  onClose,
}: RestaurantDetailModalProps) => {
  return (
    <Modal onClose={onClose}>
      <h2 className="modal-title text-title">{restaurant.name}</h2>
      <div className="restaurant-info">
        <p className="restaurant-info__description text-body">
          {restaurant.description}
        </p>
      </div>
      <div className="button-container">
        <button
          type="button"
          className="button button--primary text-caption"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default RestaurantDetailModal;

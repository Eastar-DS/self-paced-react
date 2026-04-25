import { FormEvent } from "react";
import { isRestaurantCategory, Restaurant } from "../types";
import Modal from "./Modal";
import { useForm } from "../hooks/useForm";

interface AddRestaurantModalProps {
  onClose: () => void;
  onAddRestaurant: (newRestaurant: Omit<Restaurant, "id">) => void;
}

const AddRestaurantModal = ({
  onClose,
  onAddRestaurant,
}: AddRestaurantModalProps) => {
  const { values, handleChange } = useForm({
    category: "",
    name: "",
    description: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isRestaurantCategory(values.category) || values.name === "") return;
    onAddRestaurant({
      category: values.category,
      name: values.name,
      description: values.description,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="modal-title text-title">새로운 음식점</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-item form-item--required">
          <label htmlFor="category" className="text-caption">
            카테고리
          </label>
          <select
            name="category"
            id="category"
            required
            value={values.category}
            onChange={handleChange}
          >
            <option value="">선택해 주세요</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div className="form-item form-item--required">
          <label htmlFor="name" className="text-caption">
            이름
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={values.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-item">
          <label htmlFor="description" className="text-caption">
            설명
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={5}
            value={values.description}
            onChange={handleChange}
          ></textarea>
          <span className="help-text text-caption">
            메뉴 등 추가 정보를 입력해 주세요.
          </span>
        </div>

        <div className="button-container">
          <button type="submit" className="button button--primary text-caption">
            추가하기
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRestaurantModal;

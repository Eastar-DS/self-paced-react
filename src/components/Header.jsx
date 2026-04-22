import addButtonIcon from "../assets/images/add-button.png";

const Header = ({ onAddClick }) => {
  return (
    <header className="gnb">
      <h1 className="gnb__title text-title">점심 뭐 먹지</h1>
      <button
        type="button"
        className="gnb__button"
        aria-label="음식점 추가"
        onClick={onAddClick}
      >
        <img src={addButtonIcon} alt="음식점 추가" />
      </button>
    </header>
  );
};

export default Header;

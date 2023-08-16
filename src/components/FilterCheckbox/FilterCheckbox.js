import './FilterCheckbox.css';

function FilterCheckbox({ value, onValueChange, title }) {
  return (
    <div className="checkbox">
      <label htmlFor="checkbox" className="checkbox__label">
        <input
          id="checkbox"
          type="checkbox"
          className="checkbox__input"
          checked={value}
          onChange={onValueChange}
        />
        <span className="checkbox__slider" />
      </label>
      <p className="checkbox__title">{title}</p>
    </div>
  );
}

export default FilterCheckbox;

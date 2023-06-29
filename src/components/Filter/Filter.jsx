import PropTypes from 'prop-types';
import css from './Filter.module.css';
export const Filter = ({ onFilter, filterValue }) => {
  return (
    <label className={css.filter_label}>
      <span>Find contact by name</span>
      <input
        className={css.input}
        type="text"
        value={filterValue}
        onChange={onFilter}
      />
    </label>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

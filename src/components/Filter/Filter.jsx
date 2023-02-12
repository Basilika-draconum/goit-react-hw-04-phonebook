import css from './filter.module.scss';
import PropTypes from 'prop-types';
const Filter = ({ filter, onChange }) => {
  return (
    <div>
      <h6 className={css.title}>Find contacts by name</h6>
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        defaultValue={filter}
        onChange={onChange}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Filter;

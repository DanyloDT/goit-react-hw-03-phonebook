import PropTypes from 'prop-types';
import css from './ContactList.module.css';
export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            <span className={css.item_text}>
              {name}: {number}
            </span>
            <button className={css.btn} onClick={() => onDelete(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

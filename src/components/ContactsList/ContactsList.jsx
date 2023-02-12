import PropTypes from 'prop-types';

import css from './contactsList.module.scss';

const ContactsList = ({ contacts, onDeleteBtn }) => {
  const contact = contacts.map(item => {
    return (
      <li key={item.id} className={css.contact}>
        {item.name}: {item.number}
        <button
          type="button"
          className={css.contactBtn}
          onClick={() => {
            onDeleteBtn(item.id);
          }}
        >
          Delete
        </button>
      </li>
    );
  });
  return <ul>{contact}</ul>;
};

ContactsList.propTypes = {
  onDeleteBtn: PropTypes.func.isRequired,
  contact: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
};

export default ContactsList;

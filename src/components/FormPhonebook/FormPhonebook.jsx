import { useState } from 'react';
import css from './formPhonebook.module.scss';

const FormPhonebook = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const actions = { name: setName, number: setNumber };

  const handleChange = e => {
    const { name, value } = e.target;
    actions[name](value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <div className={css.wrapper}>
      <form className={css.formPhonebook} onSubmit={handleSubmit}>
        <label className={css.formLabel} htmlFor="name">
          Name
        </label>
        <input
          className={css.formInput}
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label className={css.formLabel} htmlFor="number">
          Number
        </label>
        <input
          className={css.formInput}
          onChange={handleChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

export default FormPhonebook;

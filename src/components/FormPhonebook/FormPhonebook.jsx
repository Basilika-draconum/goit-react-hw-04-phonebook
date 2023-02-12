import { Component } from 'react';
import css from './formPhonebook.module.scss';

const INITIAL = {
  name: '',
  number: '',
};

export default class FormPhonebook extends Component {
  state = {
    ...INITIAL,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ ...INITIAL });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div className={css.wrapper}>
        <form className={css.formPhonebook} onSubmit={this.handleSubmit}>
          <label className={css.formLabel} htmlFor="name">
            Name
          </label>
          <input
            className={css.formInput}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
  }
}

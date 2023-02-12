import { Component } from 'react';
import { nanoid } from 'nanoid';
import FormPhonebook from './FormPhonebook/FormPhonebook';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './phonebook.module.scss';

const CONTACTS_LS_KEY = 'contactsList';

export default class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem(CONTACTS_LS_KEY));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(
        CONTACTS_LS_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  deleteUser = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  addUser = data => {
    if (
      this.state.contacts.some(
        item =>
          item.name.toLowerCase().trim() === data.name.toLowerCase().trim()
      )
    ) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => {
      const newUser = { ...data, id: nanoid() };

      return {
        contacts: [...contacts, newUser],
      };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(item => {
      return item.name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  }

  render() {
    const { filter } = this.state;
    return (
      <div className={css.main}>
        <h2>Phonebook</h2>
        <FormPhonebook onSubmit={this.addUser} />
        <h3 className={css.contacts}> Contacts</h3>
        <Filter filter={filter} onChange={this.handleFilter} />
        <ContactsList
          contacts={this.getFilteredContacts()}
          onDeleteBtn={this.deleteUser}
        />
      </div>
    );
  }
}

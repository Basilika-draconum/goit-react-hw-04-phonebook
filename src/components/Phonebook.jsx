import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import FormPhonebook from './FormPhonebook/FormPhonebook';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './phonebook.module.scss';

const CONTACTS_LS_KEY = 'contactsList';

const Phonebook = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(CONTACTS_LS_KEY));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACTS_LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const deleteUser = id => {
    setContacts(prev => prev.filter(item => item.id !== id));
  };

  const addUser = data => {
    if (
      contacts.some(
        item =>
          item.name.toLowerCase().trim() === data.name.toLowerCase().trim()
      )
    ) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prev => {
      const newUser = { ...data, id: nanoid() };
      return [...prev, newUser];
    });
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(item => {
      return item.name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  };

  return (
    <div className={css.main}>
      <h2>Phonebook</h2>
      <FormPhonebook onSubmit={addUser} />
      <h3 className={css.contacts}> Contacts</h3>
      <Filter filter={filter} onChange={handleFilter} />
      <ContactsList contacts={getFilteredContacts()} onDeleteBtn={deleteUser} />
    </div>
  );
};

export default Phonebook;

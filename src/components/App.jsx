import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { load, save } from './Utils/localStorage';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      save('newContacts', contacts);
    }
  }

  componentDidMount() {
    const { contacts } = this.state;
    const data = load('newContacts') ?? contacts;
    this.setState({ contacts: data });
  }

  handleAddContact = ({ name, number }) => {
    const findName = this.state.contacts.find(
      elem => elem.name.toLowerCase() === name.toLowerCase()
    );
    if (findName) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState({
      contacts: [
        ...this.state.contacts,
        {
          id: crypto.randomUUID(),
          name,
          number,
        },
      ],
    });
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredData = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };
  render() {
    const { filter } = this.state;
    const filteredData = this.getFilteredData();
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          handleChange={this.handleChange}
          handleAddContact={this.handleAddContact}
        />
        <h2 className={css.title}>Contacts</h2>
        <Filter onFilter={this.handleChangeFilter} filterValue={filter} />
        <ContactList contacts={filteredData} onDelete={this.handleDelete} />
      </div>
    );
  }
}

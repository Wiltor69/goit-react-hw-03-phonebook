import { FormPhonebook } from './FormPhonebook/FormPhonebook';

import { Component } from 'react';
import { ListContact } from './ListContact/ListContact';
import { SearchBar } from './SeachBar/SeachBar';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filters: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addName = newName => {
    const searchName = this.state.contacts
      .map(cont => cont.name)
      .includes(newName.name);

    if (searchName) {
      alert(`${newName.name} is already in contacts`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, newName],
        };
      });
    }
  };

  changeFilter = newFilter => {
    this.setState({
      filters: newFilter,
    });
  };

  handleDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  render() {
    const { filters, contacts } = this.state;
    const visibleContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filters.toLowerCase())
    );
    return (
      <>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Phonebook
        </h1>

        <FormPhonebook onAdd={this.addName} />

        <h2
          style={{
            textAlign: 'center',
          }}
        >
          Contacts:
        </h2>

        <SearchBar seachFilter={filters} onChangeFilter={this.changeFilter} />

        <ListContact contacts={visibleContact} onDelete={this.handleDelete} />
      </>
    );
  }
}

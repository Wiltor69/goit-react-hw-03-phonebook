import { FormPhonebook } from './FormPhonebook/FormPhonebook';

import { Component } from 'react';
import { ListContact } from './ListContact/ListContact';
import { SearchBar } from './SeachBar/SeachBar';

export class App extends Component {
  state = {
    contacts: [],
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

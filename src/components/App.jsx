import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Sectionh1, Sectionh2 } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFilterChange = evt => {
    const filterValue = evt.target.value;

    this.setState({ filter: filterValue });
  };

  handleFormSubmit = newContact => {
    const isNameExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isNameExist) return alert(`${isNameExist.name} is already in contacts`);

    const contact = {
      ...newContact,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleDeleteButton = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <Sectionh1 title="Phonebook">
          <ContactForm handleFormSubmit={this.handleFormSubmit} />
        </Sectionh1>
        {this.state.contacts.length >= 1 && (
          <Sectionh2 title="Contacts">
            <Filter
              name={this.state.filter}
              handleFilterChange={this.handleFilterChange}
            />
            <ContactList
              contacts={filteredContacts}
              handleDeleteButton={this.handleDeleteButton}
            />
          </Sectionh2>
        )}
      </div>
    );
  }
}

export default App;
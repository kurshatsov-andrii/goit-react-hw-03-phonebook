import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Sectionh1, Sectionh2 } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorageData = localStorage.getItem('contacts');
    if (localStorageData && JSON.parse(localStorageData).length) {
      this.setState({ contacts: JSON.parse(localStorageData) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleFilterChange = event => {
    const filterValue = event.target.value;

    this.setState({ filter: filterValue });
  };

  handleFormSubmit = newContact => {
    const isNameExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isNameExist) return alert(`${isNameExist.name} is already in contacts`);

    const contact = {
      id: nanoid(),
      ...newContact,
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
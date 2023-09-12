import css from './ContactList.module.css';

export const ContactList = ({ contacts, handleDeleteButton }) => {
  return (
    <ul className={css.contactlist}>
      {contacts.map(contact => (
        <li key={contact.id} className={css.contactitem}>
          {`${contact.name}: ${contact.number} `}
          <button
            className={css.deletebutton}
            type="button"
            onClick={() => handleDeleteButton(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
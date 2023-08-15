import { Button, List, ListItem } from './ListContact.styled';

export const ListContact = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(contact => (
        <ListItem key={contact.id}>
          <p>
            {contact.name}: {contact.number}
          </p>
          <Button onClick={() => onDelete(contact.id)}>Delete</Button>
        </ListItem>
      ))}
    </List>
  );
};

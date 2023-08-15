import { Formik, ErrorMessage } from 'formik';
import { Block, StyledField, StyledForm } from './FormPhonebook.styled';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().min(1, 'Too Short!').required('Required'),
  number: Yup.string().min(3, 'Too Short!').required('Required'),
});

export const FormPhonebook = ({ onAdd }) => {
  return (
    <Block>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onAdd({ ...values, id: nanoid() });

          actions.resetForm();
        }}
      >
        <StyledForm>
          <label>Name</label>
          <StyledField
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="div" />
          <label>Number</label>
          <StyledField
            type="tel"
            name="number"
            //  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" component="div" />

          <button type="submit">Add contact</button>
        </StyledForm>
      </Formik>
    </Block>
  );
};

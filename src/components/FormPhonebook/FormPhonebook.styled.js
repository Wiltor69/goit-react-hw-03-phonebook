import styled from 'styled-components';
import { Form, Field } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`;

export const StyledField = styled(Field)`
  padding: 4px;
  margin-bottom: 15px;
`;

export const Block = styled.div`
  border: 4px solid purple;
  width: 500px;
  margin: 0 auto;
`;

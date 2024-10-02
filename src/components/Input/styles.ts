import styled from "@emotion/styled";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #d3d3d3; /* Используем светло-серый цвет для соответствия стилю */
`;

export const InputElement = styled.input`
  width: 100%;
  height: 50px;
  padding: 12px;
  outline: none;
  border: 1px solid #d3d3d3; /* Изменение цвета границы */
  border-radius: 4px;
  font-size: 16px;
  background-color: #505050; /* Темный фон для поля ввода */
  color: #d3d3d3; /* Светло-серый текст */

  &::placeholder {
    color: #a19f9f;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  height: 20px;
`;

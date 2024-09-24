import styled from "@emotion/styled";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 4px; */
  width: 550px;
  height: 68px;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #6f6f6f;
`;

export const InputElement = styled.input`
  width: 550px;
  height: 48px;
  padding-left: 12px;
  /* gap: 10px; */
  outline: none;
  border: 1px solid white;
  border-radius: 40px;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;

  &::placeholder {
    color: #a19f9f;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  height: 20px;
`;

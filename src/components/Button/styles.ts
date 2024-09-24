import styled from "@emotion/styled";

interface ButtonComponentProps {
  disabled: boolean
}

export const ButtonComponent = styled.button<ButtonComponentProps>`
  width: 146px;
  height: 48px;
  outline: none;
  border: none;
  padding: 12px, 40px, 12px, 40px;
  gap: 10px;
  /* background: #1f27f5; */
  background: ${({disabled})=>disabled? 'grey': '#3678B4'};
  border-radius: 50px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`



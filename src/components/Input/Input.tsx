import { InputContainer, Label, InputElement, ErrorMessage } from "./styles";
import { InputProps } from "./types";

function Input({
  label,
  type = "text",
  name,
  placeholder,
  id,
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <InputElement
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <ErrorMessage> {error}</ErrorMessage>
    </InputContainer>
  );
}

export default Input;

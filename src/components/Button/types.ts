type ButtonTypes = "button" | "submit" | "reset";

export interface ButtonProps {
  name: string;
  type?: ButtonTypes;
  onButtonClick?: () => void;
  disabled?: boolean;
}

import { ChangeEvent } from "react";

export interface InputProps {
  label?: string;
  type?: string;
  name: string;
  placeholder: string;
  id?: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

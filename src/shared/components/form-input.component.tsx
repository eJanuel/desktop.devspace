import { useEffect } from "react";

export const FormInput = ({
  type,
  name,
  value,
  onChange,
  errors,
  required,
}: {
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errors: boolean | undefined;
  required: boolean;
}) => {
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

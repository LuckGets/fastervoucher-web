export interface Form {
  identifier?: string;
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: React.Dispatch<React.SetStateAction<Partial<Form>>>,
  form: Partial<Form>,
) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: value,
  });
};

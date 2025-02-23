export interface Form {
  fullname?: string;
  identifier?: string;
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
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

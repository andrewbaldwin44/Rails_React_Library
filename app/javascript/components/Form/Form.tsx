interface IForm<FormData> {
  children: React.ReactNode[];
  className?: string;
  onSubmit: (formData: FormData) => void;
  autoComplete?: 'off' | 'on';
  ref?: React.Ref<HTMLFormElement>;
}

export default function Form<FormData>({
  children,
  className,
  onSubmit,
  ...formProps
}: IForm<FormData>) {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputData: { [key: string]: string | number | boolean } = {};

    // @ts-ignore
    for (const [name, value] of formData) {
      if (value) {
        inputData[name] = value;
      }
    }

    onSubmit(inputData as FormData);
  };

  return (
    <form className={className} onSubmit={onFormSubmit} {...formProps}>
      {children}
    </form>
  );
}

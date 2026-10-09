import {
  useCallback,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;

export type UseFormOptions<T extends Record<string, unknown>> = {
  initialValues: T;
  /** Return an error message per invalid field. Empty object means valid. */
  validate?: (values: T) => FormErrors<T>;
  /** Called with the values when a submit passes validation. */
  onSubmit?: (values: T) => void | Promise<void>;
};

export type UseFormReturn<T extends Record<string, unknown>> = {
  values: T;
  /** Validation errors (all fields). Show them alongside `touched` for a calmer UX. */
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isValid: boolean;
  isSubmitting: boolean;
  /** onChange handler for inputs, selects and textareas; reads `name` and `value`/`checked`. */
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  /** onBlur handler that marks the field as touched. */
  handleBlur: (
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  /** onSubmit handler: prevents default, touches every field, validates, then calls `onSubmit`. */
  handleSubmit: (event?: FormEvent) => Promise<void>;
  /** Set one field programmatically. */
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  /** Restore `initialValues` (or the given values) and clear touched state. */
  reset: (values?: T) => void;
};

/**
 * Lightweight form state: typed values, derived validation errors, touched tracking and submit handling.
 *
 * @example
 * const form = useForm({
 *   initialValues: { email: "" },
 *   validate: (v) => (v.email.includes("@") ? {} : { email: "Enter a valid email" }),
 *   onSubmit: (v) => console.log(v),
 * });
 * <form onSubmit={form.handleSubmit}><input name="email" value={form.values.email} onChange={form.handleChange} /></form>
 */
export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Captured once: later changes to the `initialValues` argument don't reset the form.
  const [initial] = useState(initialValues);

  // Errors are derived from values on every render, so they can never go stale.
  const errors: FormErrors<T> = validate ? validate(values) : {};
  const isValid = Object.values(errors).every((e) => !e);

  const handleChange = useCallback<UseFormReturn<T>["handleChange"]>(
    (event) => {
      const target = event.target;
      const value =
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target instanceof HTMLInputElement && target.type === "number"
            ? target.valueAsNumber
            : target.value;
      setValues((prev) => ({ ...prev, [target.name]: value }));
    },
    [],
  );

  const handleBlur = useCallback<UseFormReturn<T>["handleBlur"]>((event) => {
    const name = event.target.name;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) =>
      setValues((prev) => ({ ...prev, [field]: value })),
    [],
  );

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();
    setTouched(
      Object.keys(values).reduce<FormTouched<T>>(
        (acc, key) => ({ ...acc, [key]: true }),
        {},
      ),
    );
    if (!isValid || !onSubmit) return;
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = useCallback(
    (next?: T) => {
      setValues(next ?? initial);
      setTouched({});
    },
    [initial],
  );

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    reset,
  };
}

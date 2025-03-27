"use client";
import { useState } from "react";

export const useForm = <T extends Record<string, unknown>>(
  initialValues: T
): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, handleChange];
};

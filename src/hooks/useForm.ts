import { ChangeEvent, useEffect, useMemo, useState } from 'react';


interface stateForm {
    [key: string]: any;
}
export interface stateFormValidator {
    [key: string]: [(value: string) => boolean, string]
}

export interface stateValidationResult {
    [key: string]: string | null;
}
interface useFormReturn extends stateForm {
    onInputChange: ({ target }: ChangeEvent<HTMLInputElement>) => void
    onResetForm: () => void;
}
export const useForm = (initialForm: stateForm = {}, formValidations?: stateFormValidator): useFormReturn => {

    const [formState, setFormState] = useState<stateForm>(initialForm);
    const [formStateValidation, setFormStateValidation] = useState<stateValidationResult>({});


    useEffect(() => {
        createValidator()
    }, [formState])

    const isFormValid = useMemo((): boolean => Object.values(formStateValidation).some(v => v !== null), [formState])


    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidator = () => {
        const formValidatorResult = Object.entries(formValidations ?? {}).reduce((prev, [key, [fn, errmsg]]) => {
            prev[`${key}Valid`] = fn(formState[key]) ? null : errmsg;
            return prev;
        }, {} as stateValidationResult)

        setFormStateValidation(formValidatorResult)
    }

    return {
        ...formState,
        formState,
        ...formStateValidation,
        isFormValid,
        onInputChange,
        onResetForm
    }
}
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

interface stateForm {
    [key: string]: any;
}
export interface StateFormValidator {
    [key: string]: [(value: string) => boolean, string]
}

export type stateValidationResult = {
    [key: string]: string | null;
}
// export type stateValidationResult<T> = {
//     [p in keyof T as `${p}Valid`]: string | null;
// }



type useFormReturn = stateForm & {
    onInputChange: ({ target }: ChangeEvent<HTMLInputElement>) => void
    onResetForm: () => void;
    isFormValid: boolean

}
export function useForm<T>(initialForm: stateForm = {}, formValidations?: StateFormValidator): useFormReturn {

    const [formState, setFormState] = useState<stateForm>(initialForm);
    const [formStateValidation, setFormStateValidation] = useState<stateValidationResult>({});


    useEffect(() => {
        createValidator()
    }, [formState])

    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])


    const isFormValid = useMemo(() => {
        return Object.values(formStateValidation).every(error => error === null)
    }, [formStateValidation])



    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        console.log(target)
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidator = () => {
        const formValidatorResult = Object
            .entries(formValidations ?? {})
            .reduce((prev, current) => {
                const [key, [fn, errmsg]] = current;
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
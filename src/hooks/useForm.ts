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

    // const isFormValid = useMemo((): boolean => {
    //     const foo = Object.values(formStateValidation);
    //     const value= foo.some(v => v !== null);
    //     return value;
    // }, [formStateValidation])



    const isFormValid=useMemo(()=>{
        for(const formValue of Object.keys(formStateValidation)){
            if(formStateValidation[formValue]!== null)return false;
       }
        return true;
    },[formStateValidation])



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
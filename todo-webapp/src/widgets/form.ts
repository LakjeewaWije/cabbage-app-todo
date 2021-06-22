import { useState } from "react";
import TodoInterface from "../interfaces/todo.interface";

// useForm functional componen
export const useForm = (callback: any, initialState : any ) => {
    const [values, setValues] = useState(initialState);

    // onChange
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const setIntialState = (initialState : any) => {
        console.log("Setting intial stateee ",initialState);
        setValues({ ...initialState});
    };


    // onSubmit
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await callback(); // triggering the callback
    };

    // return values
    return {
        onChange,
        onSubmit,
        setIntialState,
        values,
    };

}

    
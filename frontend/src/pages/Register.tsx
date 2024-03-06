import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';


 export type registerFormData = {
    firstName: string;
    lastName: string;
    email: string; 
    password: string;
    confirmPassword: string;
}

const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
        console.log('registration successful!')
    },
    onError: (error: Error) => {
        console.log(error.message);
    },
});

const Register = () => {
    const {register, watch, handleSubmit,
    formState: {errors}} = useForm<registerFormData>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        mutation.mutate(data);
    });
  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <h2 className='text-3xl font-bold'>Create an Account</h2>

        <div className=" flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name 
                <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName", {required: "this field is required!"})}></input>
                {errors.firstName && (
                    <span className="text-red-500">{errors.firstName.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name 
                <input className="border-rounded w-full py-1 px-2 font-normal" {...register("lastName", {required: "this field is required!"})}></input>
                {errors.lastName && (
                    <span className="text-red-500">{errors.lastName.message}</span>
                )}
            </label>
            
        </div>

        <label className="text-gray-700 text-sm font-bold flex-1">
                Email
        <input className="border-rounded w-full py-1 px-2 font-normal" 
        type="email"
        {...register("email", {required: "this field is required!"})}></input>
        {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
        )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
        <input className="border-rounded w-full py-1 px-2 font-normal" 
        type="password"
        {...register("password", {required: "this field is required!",
        minLength: {value: 6,
        message: "password must be at least 6 characters long."}})}></input>
    {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
    )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
        <input className="border-rounded w-full py-1 px-2 font-normal" 
        type="password"
        {...register("confirmPassword", {validate: (val) => {
            if(!val){
                return "this field is required!"
            } else if(watch("password") !== val){
                return "Your passwords do not match!";
            }
        }}
        )}></input>
        {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
            </label>
            <span>
                <button 
                type="submit"
                className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">Create Account</button>
            </span>
    </form>
  );
}

export default Register
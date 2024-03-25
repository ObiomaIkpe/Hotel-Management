import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client.ts';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";



export type SingInFormData = {
    email: string,
    password: string
}


const SignIn = () => {
    const {showToast} = useAppContext();
    const {register, formState: {errors}, handleSubmit} = useForm<SingInFormData>();
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            console.log("this user has been signed in!");
            //1. show the toast.
            showToast({message: "sign in successful", type: "SUCCESS"})
            //2. navigate to the home page.
            navigate('/');   
        }, onError: (error: Error) => {
            //show the toast
            showToast({message: error.message, type: "ERROR"})
    
        }
    });

    
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    
   
  return (
   <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2>Sign In</h2>
        <div>
        <label className="text-gray-700 text-sm font-bold flex-1">
                Email
        <input className="border rounded w-full py-1 px-2 font-normal" 
        type="email"
        {...register("email", {required: "this field is required!"})}></input>
        {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
        )}
            </label>
<br/>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
        <input className="border rounded w-full py-1 px-2 font-normal" 
        type="password"
        {...register("password", {required: "this field is required!",
        minLength: {value: 6,
        message: "password must be at least 6 characters long."}})}></input>
    {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
    )}
            </label>

   </div>

   <span className="flex items-center">
    <span className="text-sm ">
        Not Registered? <Link 
        className="underline" to="/register">Create an Account here</Link>
    </span>
      <button 
                type="submit"
                className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">Sign In</button>
            </span>
   </form>
  )
}

export default SignIn
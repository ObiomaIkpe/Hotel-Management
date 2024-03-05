import { useForm } from "react-hook-form";


type registerFormData = {
    firstName: string;
    lastName: string;
    email: string; 
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const {register, watch, handleSubmit} = useForm<registerFormData>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })
  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <h2 className='text-3xl font-bold'>Create an Account</h2>

        <div className=" flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name 
                <input className="border-rounded w-full py-1 px-2 font-normal" {...register("firstName", {required: "this field is required!"})}></input>
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name 
                <input className="border-rounded w-full py-1 px-2 font-normal" {...register("lastName", {required: "this field is required!"})}></input>
            </label>
            
        </div>

        <label className="text-gray-700 text-sm font-bold flex-1">
                Email
        <input className="border-rounded w-full py-1 px-2 font-normal" 
        type="email"
        {...register("email", {required: "this field is required!"})}></input>
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
        <input className="border-rounded w-full py-1 px-2 font-normal" 
        type="password"
        {...register("password", {required: "this field is required!",
        minLength: {value: 6,
        message: "password must be at least 6 characters long."}})}></input>
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
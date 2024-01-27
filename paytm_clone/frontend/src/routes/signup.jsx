import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Signup(){
    const navigate = useNavigate();
    const [firstName,setFirstName] = useState(" ");
    const [lastName,setLastName] = useState(" ");
    const [username,setUsername] = useState(" ");
    const [password,setPassword] = useState(" ");
    const [token,setToken] = useState(" ");

    async function submit(e){
        e.preventDefault();

        try{
            const reponse = await axios.post("http://localhost:3000/signup",{
                firstName,
                lastName,
                username,
                password
            })
            navigate("/signin")
        }
        catch(e){
            console.log(e);
            alert("invalid credentials");
        }

    }

    return <div className=" w-full  h-screen flex justify-center items-center bg-nocap select-none">
    <form className=" w-full font-chill max-w-md h-auto rounded-xl p-6 gap-7  flex flex-col items-center bg-white">
        <h1 className="font-bold text-5xl">SignUp</h1>
        <p className="text-center text-xl p-4 text-nocap font-semibold">Enter your information to create an account</p>
        <div className="w-full max-w-sm flex flex-col gap-3">
        <label htmlFor="" className="font-semibold text-lg">First Name</label>
        <input 
        type="text"
        className="w-full px-3 py-2 border-2 border-nocap rounded-lg  h-12 "
        onChange={(e)=>{setFirstName(e.target.value)}}
        placeholder="Abi"  />
        </div>
        <div className="w-full max-w-sm flex flex-col gap-3">
        <label htmlFor="" className="font-semibold text-lg">Last Name</label>
        <input 
        type="text"
        className="w-full px-3 py-2 border-2 border-nocap rounded-lg h-12"
        onChange={(e)=>{setLastName(e.target.value)}}
        placeholder="Newar"  />
        </div>
        <div className="w-full max-w-sm flex flex-col gap-3">
        <label htmlFor="" className="font-semibold text-lg">Email</label>
        <input 
        type="text"
        className="w-full px-3 py-2 border-2 border-nocap rounded-lg h-12"
        onChange={(e)=>{setUsername(e.target.value)}}
        placeholder="Abi@gmail.com"  />
        </div>
        <div className="w-full max-w-sm flex flex-col gap-3">
        <label htmlFor="" className="font-semibold text-lg">Password</label>
        <input 
        type="Password"
        className="w-full px-3 py-2 border-2 border-nocap rounded-lg h-12"
        onChange={(e)=>{setPassword(e.target.value)}}
        placeholder=""  />
        </div>
        <div className="w-full p-2 flex flex-col gap-3">
        <button 
        type="submit" 
        className=" bg-black p-2 text-white font-semibold w-full rounded transition-all duration-500 ease-in-out hover:bg-white hover:text-black hover:border"
        onClick={submit}>Sign Up</button>
        <h3 className="text-center">Already have a account? <Link to="/login" className=" underline">Login</Link></h3>
        </div>
        
    </form>
</div>

}
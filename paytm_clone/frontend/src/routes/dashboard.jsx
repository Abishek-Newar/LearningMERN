import Users from "./components/users";


export default function Dashboard(){

    async function submit(e){
        e.preventDefault();

        try{
            const response = await axios.get
        }
        catch{

        }
    }

    return <div>

        <nav className="flex font-chill items-center justify-between p-5 shadow-md shadow-nocap">
            <h2 className=" font-extrabold text-2xl">Payments App</h2>
            <div className="flex items-center gap-2">
            <h3 className="font-semibold">Hello , user</h3>
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-nocap">U</div>
            </div>
        </nav>
        <div className="p-6 flex flex-col font-chill gap-5">
        <div >
            <h2 className=" font-bold text-2xl">Your Balance $5000</h2>
        </div>
        <div>
            <h2 className=" font-bold text-2xl">Users</h2>
        </div>
        <div className=" w-full">
            <input type="text" className="border-2 p-6 border-nocap  rounded-lg w-full h-12 " placeholder="Search users..." />
        </div>
        <Users />
        </div>
        
    </div>
}
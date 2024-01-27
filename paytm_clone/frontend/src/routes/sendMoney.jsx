

export default function SendMoney(){

    return <div className="w-full h-screen flex items-center justify-center select-none">
        <div className="w-full rounded-md max-w-lg px-10 py-16 flex flex-col gap-20 border border-nocap shadow-2xl">
            <h1 className="text-center font-chill font-bold text-4xl">Send Money</h1>
            <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <div className=" w-16 h-16 bg-green rounded-full flex items-center justify-center">
                    A
                </div>
                <h3 className="font-bold font-chill text-3xl">Friend's Name</h3>
            </div>
            <p className="font-chill font-semibold">Amount (in RS)</p>
            <div className="flex flex-col gap-5">
            <input type="number" placeholder="Enter Amount" className="h-10 font-chill p-3 rounded border border-nocap remove-arrow" />
            <button className="h-12 bg-green font-chill text-white rounded-lg font-semibold">Initiate Transfer</button>
            </div>
            </div>
        </div>
    </div>
}
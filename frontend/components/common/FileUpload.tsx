import { Button, FileInput } from "@mantine/core";
import axios from "axios";
import error from "next/error";
import { useState } from "react";

export default function FileUpload() {
    const [value, setValue] = useState<File | null>(null);
    const eventHandler = (event : any) =>{
        event.preventDefault()
        console.log(value!.name)
        upload(value);
    }
    async function upload(value : File | null){
        try{
            const res = await axios.post("http://159.89.201.188:8000/upload",value)
            console.log(res)
        }
        catch{
            console.log(error);
        }
    }
    return (
        <>
            <FileInput placeholder="browse" value={value} onChange={setValue} />
            <Button onClick={eventHandler}>upload</Button>
        </>
    );
}

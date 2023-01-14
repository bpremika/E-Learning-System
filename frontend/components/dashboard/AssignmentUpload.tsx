import { Button, FileInput } from "@mantine/core";
import { useState } from "react";
import { client } from "../../common/axios/axios";
import FormData from "form-data";
import { showNotification } from "@mantine/notifications";
interface Props{
    assignmentID : number;
}
export default function CourseMaterialUpload(prop: Props) {
    const [selectedFile, setFiles] = useState<File | null>(null);

    const formData = new FormData();
    const uploadHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(selectedFile);
        if (selectedFile != null) {
            formData.append("selected_file", selectedFile);
            console.log(formData);
            try{
                const res = await client.post("/upload", formData);
                const submitAssignment = await client.patch(`/updateAssignment/${prop.assignmentID}`,selectedFile.name);
                showNotification({
                    title: "Success!!",
                    message: "Hey there, your code is awesome! 🤥",
                });
            }catch(e){
                showNotification({
                    title: "submit assignment fail!!",
                    message: "Hey there, your code is awesome! 🤥",
                });
                console.log(e)
            }
        }
    };
    return (
        <div className="w-1/5">
            <h1>Upload file</h1>
            <form encType="multipart/form-data" onSubmit={uploadHandler}>
                <FileInput placeholder="select your file" value={selectedFile} onChange={setFiles} />
                <Button type="submit">submit</Button>
            </form>
        </div>
    );
}

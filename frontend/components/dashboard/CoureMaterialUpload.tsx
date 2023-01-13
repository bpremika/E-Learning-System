import { Button, FileInput } from "@mantine/core";
import { useState } from "react";
import { client } from "../../common/axios/axios";
import FormData from "form-data";
export default function CourseMaterialUpload() {
    const [selectedFile, setFiles] = useState<File | null>(null);

    const formData = new FormData();
    const uploadHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(selectedFile)
        if (selectedFile != null) {
            formData.append("selected_file", selectedFile);
            console.log(formData);
            const res = await client.post(
                "/upload",
                formData
            );
            console.log(res)
        }
    };
    return (
        <div className="w-2/5">
            <h1>Upload file</h1>
            <form encType="multipart/form-data" onSubmit={uploadHandler}>
                <FileInput value={selectedFile} onChange={setFiles} />
                <Button type="submit">submit</Button>
            </form>
        </div>
    );
}

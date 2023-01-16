import {
    Button,
    FileInput,
    Group,
    Modal,
    Select,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { client } from "../../common/axios/axios";

interface UpdateAssignment {
    file_url: string;
}
interface Props {
    assignmentID: number;
    name: string;
    description: string;
    file_url: string;
}

const AssignmentDetail = (prop: Props) => {
    const [open, setOpened] = useState(false);
    const [selectedFile, setFiles] = useState<File | null>(null);
    const formData = new FormData();
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile != null) {
            formData.append("selected_file", selectedFile);
            console.log(formData);
            try {
                const uploadRes = await client.post("/upload", formData);
                const res = await client.post(
                    `course/updateAssignment/${prop.assignmentID}`,
                    { file_url: selectedFile.name } as UpdateAssignment
                );
                showNotification({
                    title: "Success!!",
                    message: "Hey there, your code is awesome! 🤥",
                });
            } catch (e) {
                console.log(e)
                showNotification({
                    title: "Failed to Submit",
                    message: "Hey there, your code is awesome! 🤥",
                });
            }
        }
    }
        return (
            <>
                <Modal
                    className=""
                    title={
                        <h1 className="text-lg font-semibold">
                            Assignment : {prop.name}
                        </h1>
                    }
                    opened={open}
                    onClose={() => setOpened(false)}
                >
                    <h1 className="font-semibold">Description</h1>
                    <p>{prop.description}</p>
                    <h1 className="font-semibold">File</h1>
                    <p>{prop.file_url}</p>
                    <form
                        encType="multipart/form-data"
                        onSubmit={submitHandler}
                    >
                        <FileInput
                            placeholder="select your file"
                            value={selectedFile}
                            onChange={setFiles}
                        />
                        <Button type="submit">submit</Button>
                    </form>
                    <Group position="right" mt="md">
                        <Button type="submit" onClick={() => setOpened(false)}>
                            Confirm
                        </Button>
                    </Group>
                </Modal>
                <a
                    className="underline text-black hover:text-green-800 cursor-pointer"
                    onClick={() => setOpened(true)}
                >
                    See more Detail
                </a>
            </>
        );
};
export default AssignmentDetail;

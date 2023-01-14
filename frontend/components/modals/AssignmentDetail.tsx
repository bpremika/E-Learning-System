import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { client } from "../../common/axios/axios";

interface Props {
    courseID: number;
    name: string;
    description: string;
    file_url: string;
}

const AssignmentDetail = (prop: Props) => {
    const [open, setOpened] = useState(false);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await client.post(
                `course/createAssignment/${prop.courseID}`
            );
            showNotification({
                title: "Success!!",
                message: "Hey there, your code is awesome! 🤥",
            });
        } catch (e) {
            showNotification({
                title: "Failed to Submit",
                message: "Hey there, your code is awesome! 🤥",
            });
        }
    };
    return (
        <>
            <Modal
                className=""
                title={<h1 className="text-lg font-semibold">Assignment : {prop.name}</h1>}
                opened={open}
                onClose={() => setOpened(false)}
            >
                <h1 className="font-semibold">Description</h1>
                <p>{prop.description}</p>
                <h1 className="font-semibold">File</h1>
                <p>{prop.file_url}</p>
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

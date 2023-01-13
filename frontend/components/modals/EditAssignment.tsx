import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface AssignmentData {
    name : string,
    description : string,
    file_url : string,
    max_score : number
}

const EditAssignment = () => {
    const [open, setOpened] = useState(false);
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            file_url: "",
            max_score: 0,
        },
    });
    return (
        <>
            <Modal
                className=""
                title={
                    <h1 className="text-lg font-semibold">Edit Assignment</h1>
                }
                opened={open}
                onClose={() => setOpened(false)}
            >
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput label="Assignment Name" placeholder="name" />
                    <TextInput label="Description" placeholder="description" />
                    <TextInput label="File URL" placeholder="file_url" />
                    <TextInput label="Max Score" placeholder="max_score" />
                    <Group position="right" mt="md">
                        <Button type="submit">Confirm</Button>
                    </Group>
                </form>
            </Modal>
            <a
                className="underline text-black hover:text-green-800 cursor-pointer"
                onClick={() => setOpened(true)}
            >
                Edit
            </a>
        </>
    );
};

export default EditAssignment;

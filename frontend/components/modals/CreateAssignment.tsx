import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import FormData from "form-data";
import { client } from "../../common/axios/axios";
import { showNotification } from "@mantine/notifications";
const CreateAssignment = () => {
    const [open, setOpened] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            file_url: "",
            max_score: 0,
        },
        transformValues: (values) => ({
            ...values,
            max_score: Number(values.max_score),
        }),
    });
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form.values);
        try{
            const res = await client.post("course/createAssignment/1", form.values);
            showNotification({
                title: "Success Create!!",
                message: "Hey there, your code is awesome! 🤥",
            });
        }catch(e){
            showNotification({
                title: "Failed to Create",
                message: "Hey there, your code is awesome! 🤥",
            });
        }
        
    };

    return (
        <>
            <Modal
                className=""
                title={
                    <h1 className="text-lg font-semibold">
                        Create New Assignment
                    </h1>
                }
                opened={open}
                onClose={() => setOpened(false)}
            >
                <form onSubmit={submitHandler}>
                    <TextInput
                        label="Assignment Name"
                        placeholder="name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Description"
                        placeholder="description"
                        {...form.getInputProps("description")}
                    />
                    <TextInput
                        label="File URL"
                        placeholder="file_url"
                        {...form.getInputProps("file_url")}
                    />
                    <TextInput
                        label="Max Score"
                        placeholder="max_score"
                        {...form.getInputProps("max_score")}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit">Confirm</Button>
                    </Group>
                </form>
            </Modal>
            <Group position="center">
                <Button onClick={() => setOpened(true)}>
                    Create New Assignment
                </Button>
            </Group>
        </>
    );
};

export default CreateAssignment;

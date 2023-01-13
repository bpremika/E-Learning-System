import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { client } from "../../common/axios/axios";

interface Props {
    courseID : number;
    name: string;
    description: string;
    file_url: string;
    max_score: number;
}

const EditAssignment = (prop: Props) => {
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
    const submitHandler = async (
        e: React.FormEvent,
        value: typeof form.values
    ) => {
        e.preventDefault();
        console.log(value);
        try {
            const res = await client.post(`course/createAssignment/${prop.courseID}`, value);
            showNotification({
                title: "Success Create!!",
                message: "Hey there, your code is awesome! 🤥",
            });
        } catch (e) {
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
                    <h1 className="text-lg font-semibold">Edit Assignment</h1>
                }
                opened={open}
                onClose={() => setOpened(false)}
            >
                <form
                    onSubmit={(e) => {
                        form.onSubmit((v) => {
                            submitHandler(e, v);
                        })();
                    }}
                >
                    <TextInput label="Assignment Name" placeholder="name" defaultValue={prop.name} />
                    <TextInput label="Description" placeholder="description" defaultValue={prop.description} />
                    <TextInput label="File URL" placeholder="file_url" defaultValue={prop.file_url}/>
                    <TextInput label="Max Score" placeholder="max_score" defaultValue={prop.max_score} />
                    <Group position="right" mt="md">
                        <Button type="submit" onClick={() => setOpened(false)}>
                            Confirm
                        </Button>
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

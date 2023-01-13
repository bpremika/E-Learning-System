import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { client } from "../../common/axios/axios";
import { showNotification } from "@mantine/notifications";
interface Props{
    courseID : number;
}
const CreateAssignment = (prop:Props) => {
    const [open, setOpened] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            aj_file_url: "",
            max_score: 0,
        },
        transformValues: (values) => ({
            ...values,
            max_score: Number(values.max_score),
        }),
    });
    // function parseNumber(score : string | number){
    //     const res = Number(score)
    //     console.log(res)
    //     return res
    // }
    const submitHandler = async (
        e: React.FormEvent,
        value: typeof form.values
    ) => {
        e.preventDefault();
        console.log(value);
        try {
            const res = await client.post(`course/createAssignment/1`, value);
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
                    <h1 className="text-lg font-semibold">
                        Create New Assignment
                    </h1>
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
                        {...form.getInputProps("aj_file_url")}
                    />
                    <TextInput
                        label="Max Score"
                        placeholder="max_score"
                        {...form.getInputProps("max_score")}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit" onClick={() => setOpened(false)}>
                            Confirm
                        </Button>
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

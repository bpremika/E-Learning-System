import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
const EditAssignment = () => {
    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            file_url: "",
            max_score: "",
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
                onClose={() => setOpen(false)}
            >
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <div className="flex flex-row justify-evenly">
                        <div>
                            <TextInput
                                label="Assignment Name"
                                placeholder="name"
                            />
                            <TextInput
                                label="Description"
                                placeholder="description"
                            />
                            <TextInput
                                label="File URL"
                                placeholder="file_url"
                            />
                            <TextInput
                                label="Max Score"
                                placeholder="max_score"
                            />
                        </div>
                    </div>
                    <Group position="right" mt="md">
                        <Button type="submit">Confirm</Button>
                    </Group>
                </form>
            </Modal>
            <a
                className="underline text-black hover:text-green-800 cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Edit
            </a>
        </>
    );
};

export default EditAssignment;

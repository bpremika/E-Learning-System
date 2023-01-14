import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { client } from "../../common/axios/axios";
import { showNotification } from "@mantine/notifications";
interface Props{
    courseID : number;
}
const CreateNewVideo = (prop:Props) => {
    const [open, setOpened] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
            video_url: "",
        }
    });
    const submitHandler = async (
        e: React.FormEvent,
        value: typeof form.values
    ) => {
        e.preventDefault();
        console.log(value);
        try {
            const res = await client.post(`course/createCourseVideo/${prop.courseID}`, value);
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
                        Upload New Video
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
                        label="Name"
                        placeholder="name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Video_URL"
                        placeholder="url"
                        {...form.getInputProps("video_url")}
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
                    Upload Video
                </Button>
            </Group>
        </>
    );
};

export default CreateNewVideo;

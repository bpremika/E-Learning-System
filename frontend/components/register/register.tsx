import { useState } from "react";
import {
    Modal,
    Button,
    Group,
    TextInput,
    Textarea,
    Select,
    Image,
    Text,
} from "@mantine/core";
import { useUser } from "../../common/contexts/UserContext";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import loginpage from "../../pages/loginpage";
import { client } from "../../common/axios/axios";
import { showNotification } from "@mantine/notifications";
export default function Register() {
    const [opened, setOpened] = useState(false);
    const form = useForm({
        initialValues: {
            prefix: "",
            username: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            image_url: "/landingImage/nattee.png",
        },
        validate: {
            username: (value) =>
                value.length < 4 ? "username must have 4 characters" : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) =>
                value.length < 8 ? "password must have 8 characters" : null,
            phone_number: (value) =>
                value.length !== 10 ? "password must have 10 digit" : null,
        },
    });
    interface formData {
        prefix: string;
        username: string;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        image_url: string;
    }
    const guideURLHandler = async (values: formData) => {
        const formValues = form.values;
        try {
            const res = await client.post("/user/studentRegister", formValues);
            setOpened(false);
            form.reset();
        } catch (error) {
            showNotification({});
        }
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Create New Course"
            >
                <form
                    onSubmit={form.onSubmit((values) =>
                        guideURLHandler(values)
                    )}
                >
                    <Select
                        label="Course Category"
                        placeholder="prefix"
                        searchable
                        nothingFound="No options"
                        data={["MR", "MS", "MRS"]}
                        {...form.getInputProps("prefix")}
                    />
                    <TextInput
                        placeholder="first_name"
                        label="first_name"
                        withAsterisk
                        {...form.getInputProps("first_name")}
                    />
                    <TextInput
                        placeholder="last_name"
                        label="last_name"
                        withAsterisk
                        {...form.getInputProps("last_name")}
                    />
                    <TextInput
                        placeholder="username"
                        label="username"
                        withAsterisk
                        {...form.getInputProps("username")}
                    />
                    <TextInput
                        placeholder="email"
                        label="email"
                        withAsterisk
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        placeholder="password"
                        label="password"
                        withAsterisk
                        {...form.getInputProps("password")}
                    />
                    <TextInput
                        placeholder="phone_number"
                        label="phone_number"
                        withAsterisk
                        {...form.getInputProps("phone_number")}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>

            <Group position="center">
                <Button onClick={() => setOpened(true)}>
                    Create New Course
                </Button>
            </Group>
        </>
    );
}

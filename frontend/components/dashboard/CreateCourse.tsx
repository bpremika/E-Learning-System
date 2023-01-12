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
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
export default function CreateCourse() {
    const [opened, setOpened] = useState(false);
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const form = useForm({
        initialValues: {
            name: "",
            category: "",
            course_desc: "",
            course_detail: "",
            course_cover_url: "",
            guide_url: "",
            instructor_id: "",
            max_student: "",
            current_student: "",
        },
    });
    const guideURLHandler = () => {
        const originalUrl = form.values.guide_url;
        // form.setFieldValue("guide_url",)
    };
    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
                key={index}
                src={imageUrl}
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
        );
    });
    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Create New Course"
            >
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                        <Text align="center">Drop images here</Text>
                        {previews}
                    </Dropzone>
                    <TextInput
                        placeholder="name"
                        label="name"
                        withAsterisk
                        {...form.getInputProps("name")}
                    />
                    <Select
                        label="Course Category"
                        placeholder="category"
                        searchable
                        nothingFound="No options"
                        data={["Thai", "Math", "Business", "Frontend"]}
                        {...form.getInputProps("category")}
                    />
                    <Textarea
                        placeholder="description"
                        label="Description"
                        withAsterisk
                        {...form.getInputProps("course_desc")}
                    />
                    <Textarea
                        placeholder="detail"
                        label="Course Detail"
                        withAsterisk
                        {...form.getInputProps("course_detail")}
                    />
                    <TextInput
                        placeholder="https://www.youtube.com/watch?v="
                        label="Guide Video Link"
                        withAsterisk
                        {...form.getInputProps("guide_url")}
                    />
                    <TextInput
                        placeholder="student"
                        label="Max Student"
                        withAsterisk
                        {...form.getInputProps("max_student")}
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

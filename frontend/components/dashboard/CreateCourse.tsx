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
import IconCheck from "../../public/check.svg";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { client } from "../../common/axios/axios";
import FormData from "form-data";
import { showNotification, updateNotification } from "@mantine/notifications";
// interface formData {
//     name: "";
//     category: "";
//     course_desc: "";
//     course_detail: "";
//     course_cover_url: "";
//     guide_url: "";
//     instructor_id: "";
//     max_student: "";
//     current_student: "";
// }
export default function CreateCourse() {
    const [opened, setOpened] = useState(false);
    const [files, setFiles] = useState<FileWithPath[]>([]);
    // const [selectedFile, setselectedFile] = useState<File | null>(null);
    const formData = new FormData();
    const form = useForm({
        initialValues: {
            name: "",
            category: "",
            course_desc: "",
            course_detail: "",
            course_cover_url: "",
            guide_url: "",
            instructor_id: 1,
            max_student: -1,
            curr_student: 0,
        },
        transformValues: (values) => ({
            ...values,
            max_student: Number(values.max_student),
        }),
    });

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        guideURLHandler();
        console.log(form);
        console.log(files);
        const file = files[0] as File;

        console.log(file);
        if (file != null) {
            formData.append("selected_file", file);
            console.log(formData);
            const uploadRes = await client.post("/upload", formData);
            if (uploadRes.status == 201) {
                const res = await client.post(
                    "course/createCourse/",
                    form.values
                );
            }
        }
        // const uploading = await client.post("/upload",);
    };
    function guideURLHandler() {
        const originalUrl = form.values.guide_url;
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = originalUrl.match(regExp);
        const getID = match && match[2].length === 11 ? match[2] : null;
        form.setFieldValue(
            "guide_url",
            `http://www.youtube.com/embed/${getID}`
        );
    }
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
                <form onSubmit={submitHandler} encType="multipart/form-data">
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
                    <Button type="submit" onClick={() => setOpened(false)}>
                        Create
                    </Button>
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

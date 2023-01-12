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
    SimpleGrid,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
export default function CreateCourse() {
    const [opened, setOpened] = useState(false);
    const [files, setFiles] = useState<FileWithPath[]>([]);
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
                <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                    <Text align="center">Drop images here</Text>
                    {previews}
                </Dropzone>

                {/* <SimpleGrid
                    cols={4}
                    breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                    mt={previews.length > 0 ? "xl" : 0}
                >
                    {previews}
                </SimpleGrid> */}
                <TextInput
                    placeholder="name"
                    label="name"
                    defaultValue=""
                    withAsterisk
                />
                <Select
                    label="Course Category"
                    placeholder="category"
                    searchable
                    nothingFound="No options"
                    data={["Thai", "Math", "Business", "Frontend"]}
                />
                <Textarea
                    placeholder="description"
                    label="Description"
                    withAsterisk
                />
                <Textarea
                    placeholder="detail"
                    label="Course Detail"
                    withAsterisk
                />
                <TextInput
                    placeholder="url"
                    label="Guide Video Link"
                    defaultValue=""
                    withAsterisk
                />
                <TextInput
                    placeholder="student"
                    label="Max Student"
                    defaultValue=""
                    withAsterisk
                />
                <Button>Create</Button>
            </Modal>

            <Group position="center">
                <Button onClick={() => setOpened(true)}>Open Modal</Button>
            </Group>
        </>
    );
}

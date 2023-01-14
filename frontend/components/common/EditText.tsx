import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import MyTextInput from "./MyTextInput";

interface Element {
    id: number;
    name: string;
    videoUrl: string;
}

export default function EditText(props: Element) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Modal
                size="sm"
                opened={opened}
                onClose={() => setOpened(false)}
                title="Edit"
            >
                <MyTextInput title="Name" draft={props.name} />
                <MyTextInput title="Video URL" draft={props.videoUrl} />
                <div className="w-full flex flex-row-reverse">
                    <Button
                        style={{ marginTop: "20px" }}
                        onClick={() => setOpened(false)}
                    >
                        Apply
                    </Button>
                </div>
            </Modal>

            <Group
                position="center"
                style={{ position: "relative", right: 20 }}
            >
                <Button onClick={() => setOpened(true)}>Edit</Button>
            </Group>
        </>
    );
}

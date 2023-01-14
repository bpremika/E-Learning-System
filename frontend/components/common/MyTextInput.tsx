import { TextInput } from "@mantine/core";

interface Key {
    title: string;
    draft: string;
}

export default function MyTextInput(props: Key) {
    return (
        <TextInput defaultValue={props.draft} label={props.title} size="xs" />
    );
}

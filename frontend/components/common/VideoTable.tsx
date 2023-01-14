import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import EditText from "./EditText";

interface Element {
    id: number;
    name: string;
    videoUrl: string;
    // edit: boolean
}

interface Elements {
    elememts: Array<Element>;
}

export default function VideoTable(props: Elements) {
    const [isOnEdit, setOnEdit] = useState(false);
    useEffect(() => {
        console.log("on edit");
    }, [isOnEdit]);

    const rows = props.elememts.map((element: any) => (
        <tr key={element.name}>
            <td>{element.id}</td>
            <td>
                <div
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: 120,
                    }}
                >
                    {element.name}
                </div>
            </td>
            <td>
                <div
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: 250,
                    }}
                >
                    {element.videoUrl}
                </div>
            </td>
            <td>
                <EditText
                    id={element.id}
                    name={element.name}
                    videoUrl={element.videoUrl}
                ></EditText>
            </td>
        </tr>
    ));

    return (
        <div
            style={{
                width: 747,
                height: 232,
                overflowX: "hidden",
                overflowY: "scroll",
            }}
        >
            <Table striped fontSize="md">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Video URL</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
}

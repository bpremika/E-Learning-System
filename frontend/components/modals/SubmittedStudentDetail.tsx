import { Button, Group, Modal, Select, Table, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];
const SubmittedStudentDetail = () => {
    const [open, setOpen] = useState(false);

    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>{element.name}</td>
            <td>{element.symbol}</td>
            <td>
                <TextInput placeholder ="score" defaultValue={element.name}/>
            </td>
        </tr>
    ));
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
                    <h1 className="text-lg font-semibold">
                        Submitted Students
                    </h1>
                }
                opened={open}
                onClose={() => setOpen(false)}
            >
                <Table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Submitted File</th>
                            <th>Scores</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
                <Group position="right" mt="md">
                    <Button type="submit">Confirm</Button>
                </Group>
            </Modal>
            <a
                className="underline text-black hover:text-green-800 cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Detail
            </a>
        </>
    );
};

export default SubmittedStudentDetail;

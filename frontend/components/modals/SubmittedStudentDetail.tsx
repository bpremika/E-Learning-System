import { Button, Group, Modal, Select, Table, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
interface Props {
    id : number;
}
const SubmittedStudentDetail = (elements : Props) => {
    const [open, setOpen] = useState(false);
    
    // const rows = elements.map((element) => (
    //     <tr key={element.name}>
    //         <td>{element.name}</td>
    //         <td>{element.symbol}</td>
    //         <td>
    //             <TextInput placeholder="score" defaultValue={element.name} />
    //         </td>
    //     </tr>
    // ));
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
                    {/* <tbody>{rows}</tbody> */}
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

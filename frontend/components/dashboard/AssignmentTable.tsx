import { Table } from "@mantine/core";
import EditAssignment from "../modals/EditAssignment";
import SubmittedStudentDetail from "../modals/SubmittedStudentDetail";

const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const operationKey: Record<keyof RowData, string> = {
    id: "ID",
    name: "Assignemt Name",
    description: "Description",
    aj_file_url: "File_URL",
    max_score: "Max Score",
    
};

interface RowData {
    id: number;
    name: string;
    description: string;
    aj_file_url: string;
    max_score: number;
}

export default function AssignmentTable() {
    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>{element.position}</td>
            <td>{element.name}</td>
            <td>{element.symbol}</td>
            <td>{element.mass}</td>
            <td>100</td>
            <td>
                <EditAssignment/>
            </td>
            <td><SubmittedStudentDetail/></td>
        </tr>
    ));
    const columns = Object.entries(operationKey).map((data) => (
        <th key={data[0]}>
            <div className="font-bold text-[#495057]">{data[1]}</div>
        </th>
    ));
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        {columns}
                        <th>Edit</th>
                        <th>Submitted Students</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}

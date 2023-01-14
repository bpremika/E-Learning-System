import { Table } from "@mantine/core";
import EditAssignment from "../modals/EditAssignment";
import SubmittedStudentDetail from "../modals/SubmittedStudentDetail";
interface AllData{
    element: Array<RowData>
}

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

export default function AssignmentTable(props: AllData) {
    const rows = props.element.map((element) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td>{element.aj_file_url}</td>
            <td>{element.max_score}</td>
            <td>
                <EditAssignment courseID={element.id} name = {element.name} description = {element.description} file_url={element.aj_file_url} max_score={element.max_score} />
            </td>
            <td>
                {/* <SubmittedStudentDetail /> */}
            </td>
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

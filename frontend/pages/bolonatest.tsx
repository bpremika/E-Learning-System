import CoursePreview from "../components/common/CoursePreview";
import CourseVideoPreview from "../components/courseVideo/CourseVideoPreview";
import CourseVideoTitle from "../components/courseVideo/CourseVideoTitle";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { FormEventHandler, useState } from "react";
import { Button, FileInput } from "@mantine/core";
import FormData from "form-data";
//icons
import FileName from "../components/common/FileName";
import CreateCourse from "../components/dashboard/CreateCourse";
import NavBar from "../components/NavBar";
import CourseMaterialUpload from "../components/dashboard/CoureMaterialUpload";
import AssignmentTable from "../components/dashboard/AssignmentTable";
import CreateAssignment from "../components/modals/CreateAssignment";

export default function bolonatest() {
    const [selectedFile, setFiles] = useState<File | null>(null);

    const formData = new FormData();
    const uploadHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(selectedFile);
        if (selectedFile != null) {
            formData.append("selected_file", selectedFile);
            console.log(formData);
            const res = await axios.post(
                "http://localhost:8000/upload",
                formData
            );
        }
    };
    return (
        <div>
            <NavBar />
            <div className="w-full">
                <CourseVideoPreview />
                <h1>Upload file</h1>
                <form encType="multipart/form-data" onSubmit={uploadHandler}>
                    <FileInput value={selectedFile} onChange={setFiles} />
                    <Button type="submit">submit</Button>
                </form>
                <FileName />
                <CreateCourse />
                <CourseMaterialUpload />
                <AssignmentTable />
                <CreateAssignment/>
            </div>
        </div>
    );
}

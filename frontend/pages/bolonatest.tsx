import CoursePreview from "../components/common/CoursePreview";
import CourseVideoPreview from "../components/courseVideo/CourseVideoPreview";
import CourseVideoTitle from "../components/courseVideo/CourseVideoTitle";
import axios from "axios"
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import FileUpload from "../components/common/FileUpload";
//icons


export default function bolonatest() {
    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center">
                <CoursePreview />
            </div>
            <CourseVideoPreview />
            <h1>Upload file</h1>
            <FileUpload/>
        </div>
    );
}

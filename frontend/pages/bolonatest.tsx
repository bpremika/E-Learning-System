import CoursePreview from "../components/common/CoursePreview";
import CourseVideoPreview from "../components/courseVideo/CourseVideoPreview";
import CourseVideoTitle from "../components/courseVideo/CourseVideoTitle";

export default function bolonatest() {
    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center">
                <CoursePreview />
            </div>
            <CourseVideoPreview />
        </div>
    );
}

import StudentsList from "../../components/common/StudentsList";
import NavBar from "../../components/NavBar";

const DashboardCourse = () => {
    return (
        <>
            <NavBar />
            <div className="flex flex-row gap-5">
                <h1 className="text-2xl font-bold font-['Montserrat']">
                    Aj.Puun Dashboard
                </h1>
                <h1 className="text-2xl font-bold font-['Montserrat'] text-gray-700">
                    Course Name
                </h1>
                
            </div>
        </>
    );
};
export default DashboardCourse;

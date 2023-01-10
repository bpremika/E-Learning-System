import CourseCard from "../components/common/CourseCard";
import DashboardTotalCard from "../components/common/DashboardTotalCard";
import DashboardCourseCard from "../components/common/DashboardCourseCard";

export default function TestCard() {
  return (
    <>
      {/* <CourseCard
        name=""
        imgurl=""
        description=""></CourseCard> */}

      {/* <DashboardTotalCard
        title="total course"
        amount={23}></DashboardTotalCard> */}

      <DashboardCourseCard
        subject="cal1"
        students={10}
        allStudents={20}></DashboardCourseCard>
    </>
  )
}

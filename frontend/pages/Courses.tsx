import SearchBar from "../components/common/SearchBar";
import NavBar from "../components/NavBar";

const Courses = () => {
    return (
        <>
            <NavBar />
            <div className="my-[50px]">
                <div className="flex flex-row justify-around">
                    <div className="font-bold text-[30px] font-['Montserrat'] ">
                        Online Courses
                    </div>
                    <SearchBar />
                </div>
            </div>
        </>
    );
};
export default Courses;

export async function getStaticProps() {
    const courses = await clien;
    return {
        props: {}, // will be passed to the page component as props
    };
}

import Link from "next/link";

const NavBar = () => {
    return (
        <div className={`bg-offwhite h-[88px]`}>
            <div className={``}>GlobalTalk</div>
            <div>
                <Link href="/">Home</Link>
                <Link href="/">Course</Link>
            </div>
        </div>
    );
};
export default NavBar;

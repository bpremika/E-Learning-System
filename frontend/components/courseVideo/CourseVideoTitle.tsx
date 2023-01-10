interface Props {
    onClick?: (newType: string) => void 
}

export default function CourseVideoTitle(prop : Props) {
    return <div className="flex flex-row hover:bg-[#2B788B] p-3">
            <h2 className="border-black pr-3 border-r-2 text-lg font-semibold font-['Montserrat']">1</h2>
            <h2 className="text-lg pl-2 font-semibold font-['Montserrat']">Title Video 1</h2>
        </div>
}
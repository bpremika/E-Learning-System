interface Props {
    index: number;
    courseTitle: string;
    onClick?: () => void;
    activeVideo: number;
}

export default function CourseVideoTitle(prop: Props) {
    return (
        <div
            onClick={prop.onClick}
            className={`flex flex-row hover:bg-[#2B788B] px-5 py-3 cursor-pointer ${prop.activeVideo == prop.index-1 ? 'bg-[#2B788B] text-white' : 'bg-transparent'}`}
        >
            <h2 className= {`pr-3 border-r-2 text-lg font-semibold font-['Montserrat'] ${prop.activeVideo == prop.index-1 ? 'border-white' : 'border-black'}`}>
                {prop.index}
            </h2>
            <h2 className="text-lg pl-2 font-semibold font-['Montserrat']">
                {prop.courseTitle}
            </h2>
        </div>
    );
}

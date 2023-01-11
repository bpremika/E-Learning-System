import Image from "next/image";
interface data {
    title: String;
    info: String;
}
interface props {
    data?: data;
    number: number;
}

function color(i: number) {
    const x = i % 2;

    switch (x) {
        case 0:
            return "bg-white-500";
        default:
            return "bg-offwhite";
    }
}
function height(i: number) {
    const x = i % 2;

    switch (x) {
        case 0:
            return "md:h-[600px]";
        default:
            return "md:h-[500px]";
    }
}

export default function AdviceCard({ data, number }: props) {
    return (
        <div className={`${color(number)} rounded-md p-4 ${height(number)}`}>
            <Image
                height={580}
                width={473}
                alt="Image"
                src="./landingImage/casualBoy.svg"
            />
        </div>
    );
}

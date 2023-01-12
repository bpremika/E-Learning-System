import React from "react";

interface Props {
    name?: string;
    video_url: string;
    width: string;
    height: string;
}
export default function YoutubeVideo(prop: Props) {
    return (
        <div className="p-5">
            <iframe
                width={prop.width}
                height={prop.height}
                title=""
                src={prop.video_url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}

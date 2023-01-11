import React from "react";

interface Props{
    name? : string,
    video_url? : string
}
export default function YoutubeVideo(prop:Props) {
    return (
        <div className="p-5">
            <iframe
                width="426"
                height="240"
                title=""
                src="https://www.youtube.com/embed/1XqIWr_WqM4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}

import React from "react";

export default function YoutubeVideo() {
    return (
        <div className="">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1XqIWr_WqM4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}

import React from "react";

const ImagePanel = ({ src, alt, desc }) => {
    return(
        <div className="image-panel">
            <img className="responsive-image" src={src} title={desc} alt={alt} />
        </div>
    )
};

export default ImagePanel;

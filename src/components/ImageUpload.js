import React from 'react';

const ImageUpload = ({onUpload,imageUrl}) => {
    return(
        <input type="file" onChange={this.onUpload} className="fl w4 tc w6-ns f3-ns f6 f3-ns ml1 pointer"/>
    )
}

export default ImageUpload;
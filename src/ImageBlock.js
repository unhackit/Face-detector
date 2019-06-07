import React from 'react';
import './ImageBlock.css'


const ImageBlock = ({imageUrl, box}) => {

	return (
		<div className="text-center d-flex justify-content-center">
			<div className="text-center mt-4 position-absolute border">
				<img id='inputImage' alt='' src={imageUrl} max-width="500px" height="auto"/>
				<div className="bounding-box" 
				style={{top: box.topRow, right: box.rightCol , bottom: box.bottomRow, left: box.leftCol}}>
				</div>
			</div>
		</div>
	)
}

export default ImageBlock
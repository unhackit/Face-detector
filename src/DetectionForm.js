import React from 'react'

const DetectionForm = ({searchChange, submit}) => {
	return (
		<div className="text-center d-flex justify-content-center">
			<input 
			placeholder="Enter Image URL here"
			onChange={searchChange}
			className="form-control w-50"
			/>
			<button className="btn btn-outline-light pl-3 pr-3 ml-3 mr-3" onClick={submit}> Detect </button>
		</div>
	)
}

export default DetectionForm
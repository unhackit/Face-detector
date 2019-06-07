import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import DetectionForm from './DetectionForm';
import ImageBlock from './ImageBlock'

const particles = {
  particle: {
    number: {
      value: 1000000,
      density: {
        enable: true,
        value_area: 10000
      }
    },
    size: {
      anim: {
        enable: true,
        speed: 100,
      }
    }
  }
}

  const app = new Clarifai.App({
  apiKey: '73aae11c2b1644cd96b35be27d6a8278'
  });


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  onInput = (e) => {
    this.setState({input: e.target.value})
  }

  calculateFaceBox = (data) => {
    console.log(data)

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height)
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }


  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceBox(response)))
    .catch( err => console.log(err))
  }

  

  displayFaceBox = (box) => {
    this.setState({box: box})
  }


  render(){
    return (
      <div>
        <Particles className='particles' params={particles} />
        <div className="text-center mt-3 mb-3" style={{color: 'white'}}>
          <h2 className=""> Face Detection App </h2>
        </div>
          <DetectionForm searchChange={this.onInput} submit={this.onSubmit} />
          <ImageBlock box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    )
  }
}

export default App;

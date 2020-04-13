import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Gallery } from './models/Gallery';
import { colors } from './constant/colors'
import { saturation } from './constant/saturation'


//iniital state for each gallery variable
let initialState : any[] = []


let fiveBox: Gallery[] =[]

// inital to push 40 box into hooks state
for (let i = 1; i < 50; i++) {
  let newGallery: Gallery = {
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    saturation: saturation[Math.floor(Math.random() * saturation.length)]
  }
  // push method is here
  // console.log(fiveBox);

  if(fiveBox.length <= 4){
    fiveBox.push(newGallery)
  }else{
    initialState.push(fiveBox);
    fiveBox = []
  }
}


export interface ResetMethod {
  string: string,
  value: any,
}

function App() {
  // let set the state of gallery item here
	const [galleries, resetGalleries] = React.useState(initialState)


  // lets set category item selected
  const [category] = React.useState('')

  // lets set saturation item selected
  // const [saturation] = React.useState(false)
  // lets set default saturation firstly mounted saturation
  // const [defaultSaturation, setDefaultSaturation] = React.useState(false)


  // handle reset gallery state based on filter
  const handleResetGallery = (key:string, value:any)=>{

    let fiveBox: any[] =[]
    let counter : number = 0
    for (let i = 0; i < initialState.length; i++) {

      for(let a=0;a<initialState[i].length;a++){
        // filtering condition for category and saturation here
        if(initialState[i][a][key] === value){
          counter++
          fiveBox.push(initialState[i][a])
        }
      }
    }
    //displaying filter counter
    console.log(counter);


    let updateState : any[] = []
    let index : any[] = [];

    // lets group five matching filter
    for(let k=1;k< Math.ceil(fiveBox.length / 5)+1;k++){
      // get pagination slice array of fivebox
      index = fiveBox.slice((k-1) * 5, 5*k)
      updateState.push(index)
    }

    // update state of galleries
    resetGalleries(updateState)

  }


  return (
    <div className="App">
      <select value={category} onChange={(e)=>{
        handleResetGallery('color',e.target.value)
      }}>
        <option value="">---Please select category---</option>
        {
          colors.map((c, idx)=> {
            return (
              <option key={idx} value={c}>{c}</option>
            )
          })
        }
      </select>
      <br/>
      <br/>
      Lighter or Darker? <input type="checkbox" onChange={(e)=>{
        handleResetGallery('saturation',e.target.checked)
      }}/>
      <br/>
      {
        galleries.map((f, k)=>{
          return (
            <div key={k}>
              {
                f.map((g: Gallery)=>{
                  return (
                    <div
                      className={`item`}
                      style={{backgroundColor: g.color}} key={g.id}>
                      <p>
                        {g.id} - {g.color} - {g.saturation ? 'darker' : 'lighter'}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  );
}

export default App;

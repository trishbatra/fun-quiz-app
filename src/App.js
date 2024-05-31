import { useEffect, useState } from 'react';
import './App.css';
import questionsArray from './data';

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [val, setval] = useState({})
  let [score , setscore] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0);
  function valueSetOnChange(e,i){
    const {value, name} = e.target
    console.log(e.target.name)
    setval(prevState=>({
      ...prevState,
      [name]: value
    }))
  }
  function runMe(e, questionIndex,element) {
    e.preventDefault();

    if(val[`question${questionIndex}`]){
      let allBtns = document.getElementsByClassName("submitBtnCss")
      allBtns[questionIndex].setAttribute("disabled", `${!!val["question"[questionIndex]]}`)
    }

    if (val[`question${questionIndex}`] === element["answer"]) {
      setscore(score = score + 1)
      toast.info('Correct answer ✔️', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        });
    }else{
      setscore(score = score -1)
      toast.info('Incorrect answer ❌', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        });
    }
    setAnsweredCount(prevCount=>prevCount+1)
  }
  useEffect(() => {
    if(Object.keys(val).length === 10){
      toast.info(`Quiz is finished your score is ${score} `, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        });
       setval({})
       setscore(0)
       let btns= document.getElementsByClassName("submitBtnCss")
       Array.from(btns).forEach(element => {
        element.removeAttribute("disabled")
       });
    }
  }, [answeredCount]);
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
        />
      <h1 className='myTextClass'> Hi my name is Trish Batra <br /> welcome to my quiz  </h1>
      <div className="scoreContainer">
        <span className='myTextClasss'> Score: {score} </span>
      </div>>
        <form  className='myTextClass'>
        {questionsArray.map((qe,i)=>{
          return <div key={i}>
            <label className='myQuestion'>  {qe.question}</label>
            {qe.options.map((e, index)=>{
              return <div key={index}> 
                <input 
                type="radio" 
                onChange={(e)=>{valueSetOnChange(e,i)}} 
                name={`question${i}`} 
                value={e}  
                className='radioBtns'
                id={e}
                checked={val[`question${i}`] === e} />
                <label className='myoption radioLabels' htmlFor={e} >{e}</label>
              </div>
            })}
              <button 
                key={i} 
                className='submitBtnCss'
                title={val[`question${i}`] ? "You have already answered this question" : ""}
                onClick={(e) => runMe(e, i,qe)}> Submit </button> 
          </div>
        })}
        </form>
    </div>
    // disabled={!!val[`question${i}`]}
  );
}

export default App;

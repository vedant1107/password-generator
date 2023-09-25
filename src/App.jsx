import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  //useState hook
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [splCharAllowed, setSplCharAllowed] = useState(false)
  const [password, setPassword] = useState("") 

  //useRef hook
  const passwordRef = useRef(null)

  //useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(splCharAllowed) str += "!@#$%^&*()_-+=~`{}[]<>?"

    for(let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length)
      pass += str[ind]

    }

    setPassword(pass)


  }, [length, numAllowed, splCharAllowed, setPassword])

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
  }, [password])
    
  

  //useEffect hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, splCharAllowed])

  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700' >

        <h1 className='text-center text-white my-1'>Password Generator</h1>

        <div className='flex overflow-hidden mb-4'>

          <input 
          type="text"
          value={password}
          className='outline-none rounded-lg w-full mx-0.5 py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}  // reference using useRef hook
          />
          <button onClick={copyToClipboard} className='outline-none rounded-lg bg-blue-700 text-white mx-0.5 px-3 py-0.5 shrink-0'>copy</button>
          <button onClick={passwordGenerator} className='outline-none rounded-lg bg-blue-700 text-white mx-0.5 px-3 py-0.5 shrink-0'>new</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range" 
              min={6}
              max={30}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={numAllowed}
              id='numInput'
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={splCharAllowed}
              id='charInput'
              onChange={() => {
                setSplCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App

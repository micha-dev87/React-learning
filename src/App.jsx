import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <button onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'

function App() {
  let [coatForMan, coat] = useState('남자 코트 추천');
  let [gangnamUdon, udon] = useState('강남 우동 맛집');
  let [learnPy, pyg] = useState('파이썬 독학');

  let [count, changeCount] = useState(0);

  return (
    <div className='App'>
      <div className="black-nav">
        <div>ReactBlog</div>
      </div>
      <div className='list'>
        <h4>{coatForMan}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4 onClick={() =>udon('강남여자')}>{gangnamUdon}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{learnPy}</h4>
        <p>2월 17일 발행</p>
      </div>


      <h4> {count[0]} <span onClick={() => { changeCount(count + 1) }} >👍</span> {count}</h4>
    </div>

  )
}

export default App

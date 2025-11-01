import './App.css'
import CanvasArea from './CanvasArea';
import { useShapeRender } from './hooks/useShapeRender';

function App() {
  const {
    lines,
    boxes,
    draw,
    clearAll
  } = useShapeRender();

  return (
    <div className={'container'}>
      <div className='toolbar'>
        <button className={'btn generate'} onClick={draw}>Generate</button>
        <button className={'btn clear'} onClick={clearAll}>Clear</button>
      </div>
      <CanvasArea>
        {lines.map(x => x.renderLine())}
        {boxes.map(x => x.renderBox())}
      </CanvasArea>
    </div >
  )
}

export default App

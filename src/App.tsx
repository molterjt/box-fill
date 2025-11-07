import { useState } from 'react';
import './App.css'
import Draw from './components/Draw';
import Free from './components/Free';
import { TAB } from './types';
import Navbar from './components/Navbar';
import MondrianCanvas from './components/Mondrian/MondrianCanvas';

function App() {
  const [activeTab, setActiveTab] = useState<TAB>(TAB.ART);
  return (
    <div className='view'>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className='app-view'>
        {activeTab === TAB.ART ? (<MondrianCanvas />) : null}
        {activeTab === TAB.DRAW ? (<Draw />) : null}
        {activeTab === TAB.UN ? (<Free />) : null}
      </div>
    </div >
  )
}

export default App

import React from 'react'
import { TAB } from '../types'

interface Props {
  activeTab: TAB;
  setActiveTab: React.Dispatch<React.SetStateAction<TAB>>;
}
export default function Navbar({
  activeTab,
  setActiveTab
}: Props) {
  return (
    <ul className='nav-bar'>
      <li
        className='nav-btn'
        style={activeTab === TAB.ART ? { color: 'aqua' } : undefined}
        onClick={() => setActiveTab(TAB.ART)}
      >
        Mondrian Art
      </li>
      <li
        className='nav-btn'
        style={activeTab === TAB.DRAW ? { color: 'aqua' } : undefined}
        onClick={() => setActiveTab(TAB.DRAW)}
      >
        Free Draw
      </li>
      <li
        className='nav-btn'
        style={activeTab === TAB.UN ? { color: 'aqua' } : undefined}
        onClick={() => setActiveTab(TAB.UN)}
      >
        Unknown
      </li>
    </ul>
  )
}

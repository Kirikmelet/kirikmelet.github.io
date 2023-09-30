import Image from 'next/image'
import TestHeader from './components/header'
import { ReactElement, useEffect, useRef } from 'react'
import UseCanvas from './components/canvas'

export default function Home() {
  return (
    <main
      className='bg-slate-100 dark:bg-slate-800 min-h-screen flex flex-col overflow-hidden'
    >
      <header>
        <TestHeader />
      </header>
      <article className='m-12 h-100 flex-grow' id="article">
        <UseCanvas></UseCanvas>
      </article>
    </main>
  )
}

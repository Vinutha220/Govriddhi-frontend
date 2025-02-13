import React from 'react'
import { Navigation } from './navigation'
import { Header } from './header'
import { About } from './about'
import SmoothScroll from "smooth-scroll";
import '../App.css'
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export default function Landingpage() {
  return (
    <div><Navigation />
      <Header />
<About />
</div>
    
  )
}

import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { navLinks } from "../../constants/index.js"

export const Navbar = () => {

    useGSAP(()=>{
        const navTween = gsap.timeline({
            scrollTrigger:{
                trigger:'nav',
                start:'bottom top'
            }
        });

        navTween.fromTo('nav',{backgroundColor:'transparent'},{
            backgroundColor:'#00000050',
            backdropFilter:'blur(10px)',
            duration:0.5,
            ease:'power2.inOut'
        })
    })

  return (
    <nav>
        <div>
            <a href="#home" className="flex items-center gap-2">
                <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
                <p>Velvet</p>
            </a>

            <ul>
                {navLinks.map((link)=>(
                    <li key={link.id}>
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
  )
}

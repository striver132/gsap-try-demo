import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useRef } from 'react';
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const videoRef = useRef(null);

    const isMobile = useMediaQuery({maxWidth:768})

    useGSAP(()=>{
        const heroSplit = new SplitText('.title',{type:'chars,words'})
        const pargraphSplit = new SplitText('.subtitle',{type:'lines'})

        heroSplit.chars.forEach((char)=> char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars,{
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.05
        })
        gsap.from(pargraphSplit.lines,{
            opacity:0,
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.05,
            delay:1
        })

        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end:'bottom top',
                scrub:1
            }
        })
          .to('.right-leaf',{y:200},0)
          .to('.left-leaf',{y:-200},0)
        
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% bottom' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:'video',
                start:startValue,
                end:endValue,
                scrub:true,
                pin:true,
            }
        }) 

        videoRef.current.onloadedmetadata = () => {
            tl.fromTo(videoRef.current,{
                currentTime:0
            },{
                currentTime:videoRef.current.duration,
                duration:videoRef.current.duration,
                ease:'linear'
            })
        }
    },[])
    
  return (
   <>
    <section id="hero" className="noisy">
        <h1 className="title">Mojto</h1>

        <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf"/>
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf"/>

        <div className="body">
            <div className="content">
                <div className="space-y-5 hidden md:block">
                    <p>Cool.Crsp.Classic.</p>
                    <p className="subtitle">Sip the Spirit</p>
                </div>

                <div className="view-cocktails">
                    <p className="subtitle">Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. </p>
                    <a href="#cocktails">View Cocktails</a>
                </div>
            </div>
        </div>
    </section>

    <div className="video absolute inset-0">
        <video src="/videos/output.mp4"
                ref={videoRef}
                muted
                playsInline
                preload="auto"
        ></video>
    </div>
   </>
  )
}

export default Hero
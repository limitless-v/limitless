import { useState } from 'react';
import Particles from './Particles';
import ScatterText from './ScatterText';

const projects = [
  { name: 'Deeyam', category: 'WEB / PROJECT', description: 'Explore Deeyam at deeyam.com.', tags: ['Website'], href: 'https://deeyam.com' },
  { name: 'Phishing detection', category: 'ML / SECURITY', description: 'A Chrome extension with three levels of risk response, a Flask prediction API, and an offline heuristic fallback.', tags: ['scikit-learn', 'Flask', 'Chrome extension'] },
  { name: 'Rubik’s Cube Solver', category: 'COMPUTER VISION', description: 'From webcam to solution. Real-time face scanning, k-means color clustering, and the Kociemba algorithm.', tags: ['OpenCV', 'Python', 'Kociemba'] },
  { name: 'Little Known Planet', category: 'WEB / MARKETPLACE', description: 'UI contributions for a travel marketplace: multi-tab listings, event contributors, and a social video feed.', tags: ['React', 'TypeScript', 'Node.js'] },
  { name: '4 Dots', category: 'WEB / SERVICES', description: 'A printing services website connecting a React frontend with a .NET backend.', tags: ['React', '.NET'] },
];
const toolkit = [
  { name: 'The interface', tools: 'React / TypeScript / Tailwind CSS', detail: 'Interfaces that make complex ideas feel simple.' },
  { name: 'The engine', tools: 'Node.js / Express / Flask / MongoDB', detail: 'APIs and applications, connected end to end.' },
  { name: 'The exploration', tools: 'Python / RAG / scikit-learn / C / C++', detail: 'Academic AI projects and a growing interest in embedded systems.' },
];
//fix
export default function App() {
  const [paused, setPaused] = useState(false);
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header flex items-center justify-between gap-6">
      <a className="wordmark" href="#home" aria-label="Surajkumar KS home">Surajkumar KS<span>limitless-v</span></a>
      <nav aria-label="Main navigation" className="flex items-center gap-5 md:gap-9"><a href="#work">Work <span>01</span></a><a href="#about">About <span>02</span></a><a href="#contact">Let’s talk ↗</a></nav>
    </header>
    <main id="main">
      <section id="home" className="hero relative">
        <div className="hero-top flex justify-between gap-4"><span className="status"><i /> OPEN TO OPPORTUNITIES</span><span>KERALA, INDIA / IST</span></div>
        <div className="hero-layout grid lg:grid-cols-2 items-center">
          <div className="hero-copy relative z-10"><p className="eyebrow">SURAJKUMAR K S — FORWARD DEPLOYED ENGINEER</p><h1>Curiosity.<br />Code.<br /><ScatterText>Possibility.</ScatterText></h1><p className="intro">Forward Deployed Engineer.<br />Turning the “what if” into something that works.</p><a href="#work" className="primary-link inline-flex items-center justify-between gap-12">Explore selected work <span>↘</span></a></div>
          <div className="particle-stage relative"><Particles paused={paused} /><div className="orbit-label">FIG. 001 / IDEAS IN MOTION</div><span className="cross cross-one">+</span><span className="cross cross-two">+</span><div className="particle-controls flex items-center justify-between gap-3"><span>MOVE YOUR POINTER TO INTERACT</span><button type="button" onClick={() => setPaused(p => !p)} aria-pressed={paused}>{paused ? 'Play motion ↗' : 'Pause motion Ⅱ'}</button></div></div>
        </div>
        <div className="hero-bottom flex justify-between"><span>REACT · PYTHON · AI · A LITTLE LOW-LEVEL</span><a href="#work">SCROLL TO DISCOVER ↓</a></div>
      </section>
      <section id="work" className="work-section section-pad">
        <div className="section-heading flex flex-wrap justify-between items-end gap-5"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Built to do<br /><span className="italic">something.</span></h2></div><p className="section-note">From intelligent tools to practical interfaces.<br />A selection of things I’ve worked on.</p></div>
        <div className="project-list">{projects.map((project, index) => <article key={project.name} className="project-row grid md:grid-cols-[70px_1fr_1fr] gap-5 md:gap-10"><span className="project-number">0{index + 1}</span><div><p className="eyebrow">{project.category}</p><h3>{project.href ? <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer">{project.name} ↗</a> : project.name}</h3></div><div><p className="project-description">{project.description}</p><ul className="tags flex flex-wrap gap-2" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div></article>)}</div>
        <a href="https://github.com/limitless-v" target="_blank" rel="noopener noreferrer" className="text-link">Explore my GitHub ↗</a>
      </section>
      <section id="about" className="about-section section-pad grid lg:grid-cols-2 gap-12 lg:gap-24"><div><p className="eyebrow">02 / THE PERSON BEHIND THE CODE</p><h2>Always<br />a <ScatterText>work</ScatterText><br />in progress.</h2><div className="about-stamp">SURAJKUMAR K S / LIMITLESS-V<br />LEARNING IS THE CONSTANT.</div></div><div className="about-body"><p className="about-lead">I like the space between<br />“how does it work?” and<br />“I could build that.”</p><p>I’m Surajkumar K S, a Junior React Developer at AsimovX Technologies in Kerala, India, since December 2025. I’m a BCA graduate from NSS College, Rajakumari.</p><p>My roots are in C, C++, and Python. Today I work with React and TypeScript, build Node and Flask backends, and explore AI tooling through RAG pipelines and language model APIs. Embedded systems are my next rabbit hole.</p><div className="toolkit">{toolkit.map(group => <div key={group.name}><h3>{group.name}</h3><p className="tool-names">{group.tools}</p><p>{group.detail}</p></div>)}</div></div></section>
      <section id="contact" className="contact-section section-pad"><p className="eyebrow">03 / WHAT’S NEXT?</p><h2>Good things<br />start with <span className="italic">hello.</span></h2><div className="contact-bottom flex flex-col md:flex-row justify-between gap-8"><p>Have an idea, an opportunity, or a technical rabbit hole?<br />Let’s connect on LinkedIn or GitHub.</p><div className="flex flex-wrap gap-4"><a className="primary-link inline-flex items-center justify-between gap-12" href="https://www.linkedin.com/in/surajkumar-k-s-11b990360/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span>↗</span></a><a className="primary-link inline-flex items-center justify-between gap-12" href="https://github.com/limitless-v" target="_blank" rel="noopener noreferrer">Find me on GitHub <span>↗</span></a></div></div></section>
    </main>
    <footer className="flex flex-wrap justify-between gap-4"><span>© {new Date().getFullYear()} SURAJKUMAR K S</span><span>BUILT WITH CURIOSITY / BLACK & WHITE</span><a href="#home">BACK TO TOP ↑</a></footer>
  </>;
}

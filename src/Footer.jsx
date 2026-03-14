import './modules.css';
import './App.css';
import Logotipo  from './assets/logo.jpeg'

export default function Footer() {
    return (
        <footer className="footer-fixed" style={{background: 'gray'}}>
            © 2026 typefish. All rights reserved.
            <ul className='justify-content-center d-flex gap-5'>
                <li><a href="#" className='text-white fw-bold fs-5 hover:text-blue-500 hover:scale-125 hover:bg-blue-500 hover:rounded-full hover:pointer-events-auto' style={{color: 'white',}}>DOCS</a></li>
                <li><a href="#" className='text-white fw-bold fs-5 hover:text-blue-500 hover:scale-125 hover:bg-blue-500 hover:rounded-full hover:pointer-events-auto' style={{color: 'white',}}>About US</a></li>
                <li><a href="#" className='text-white fw-bold fs-5 hover:text-blue-500 hover:scale-125 hover:bg-blue-500 hover:rounded-full hover:pointer-events-auto' style={{color: 'white',}}>NEWS</a></li>
                <li><a href="#" className='text-white fw-bold fs-5 hover:text-blue-500 hover:scale-125 hover:bg-blue-500 hover:rounded-full hover:pointer-events-auto' style={{color: 'white',}}>TYPEFISH</a></li>
                <li><a href="#" className='text-white fw-bold fs-5 hover:text-blue-500 hover:scale-125 hover:bg-blue-500 hover:rounded-full hover:pointer-events-auto' style={{color: 'white',}}>COMMUNITY</a></li>
                <img src={Logotipo} alt="Logotipo" width="200" height="50" />
            </ul>
        </footer>

    )
}
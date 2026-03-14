import postgresql from './assets/PostgresSQL.svg';
import Github from './assets/GitHub.png';
import chrome from './assets/Chrome.svg';

export default function Login() { 
    return(
        <div>
            <div style={{fontFamily: "Arial, sans-serif", backgroundColor: "#f0f0f0", color: "#333", padding: "20px", minHeight: "100vh", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px"}}>
             <img src={postgresql} alt="Metasploit Logo" width="200"></img>
              <h1>Login</h1>
                <input name="username" placeholder="Username"/>
                <input name="password" placeholder="Password" type="password"/>
                
                <div className='buttons' style={{display: 'grid', gap: '10px'}}>
                       <button>Login</button>
                       <button>Register
                       </button>
                       <button>Forgot Password</button>
                </div>
                <div className='buttons-social' style={{display: 'flex', gap:'10px'}}>
                    <p>Or login with:</p>
                    <button className='link:github' type='button'>
                        <img src={Github} alt="GitHub Logo" width="30" />
                    </button>
                    <button className='link:chrome' type='button'>
                        <img src={chrome} alt="Chrome Logo" width="30" />   
                    </button>
                </div>
            </div>
        </div>
    );
}           
        
import React, { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../../context/AuthProvider";
import axios from '../../API/axios';
import { FaUserCircle , FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import "./style.css";
import Footer from '../../Components/AppFooter/index';

//en relation avec le back
const LOGIN_URL='/auth';

const Login = () => {

    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        userRef.current.focus();    
    }, []);

    useEffect(()=>{
        setErrMsg('');
    },[user,pwd])

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,JSON.stringify({user,pwd}),
            {
                headers: {'Content-Type': 'application/json'},
            //including credentials (e.g., cookies, HTTP authentication, etc.)
                withCredentials:true
            }
            );
            //A REVOIR 
            // setAuth('');
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if(!err?.response){
                setErrMsg('No server Response');
            }else if(err.response?.status === 400){
                setErrMsg('Missing Username or Password');
            }else if(err.response?.status === 401){
                setErrMsg('Unauthorized');
            }else{
                setErrMsg('Login Failed');
            }
            
            errRef.current.focus();
        }

       
    }

    return (
        <div className="login-page">
        <div className="rectangle container" >
            <div className=" icon-container children">
                <FaUserCircle color="#FA5D00" size={60}/>
            </div>
            <div className="children">
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live='assertive'>
                    {errMsg}
                </p>
            </div>
            <div className="children">
                <h2 className='title'>Login</h2>
                <h3 className='sous-titre'>Connectez-vous à votre compte</h3>
            </div>
            <div className="children">
            <form onSubmit={handleSubmit}  >
                <div class="group">      
                    <input 
                        type="text"
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required />
                    {/* <span class="highlight"></span> */}
                    <span class="bar"></span>
                    <label>Username</label>
                    <div className="toggle">
                        <FaUser />
                    </div>
                </div>

                <div class="group">      
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Password</label>
                    <div className="toggle" onClick={handleTogglePassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>

                <div className="container">
                    <div>
                        <p>
                            <a href='#'>Mot de pass oublié ?</a> 
                        </p>
                    </div>
                    <div>
                    <   button className="boutton">Se connecter</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default Login;

import React, { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../../context/AuthProvider";
import axios from '../../API/axios';
import "./style.css";
import AppHeader from '../../Components/AppHeader/index';




const LOGIN_URL='/addDevise';

const ManageDevise = () => {

    // const { setAuth } = useContext(AuthContext);
    const PaysRef = useRef();
    const CodeRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        PaysRef.current.focus();    
    }, []);

    useEffect(()=>{
        setErrMsg('');
    },[user,pwd,email,firstName,lastName])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        // try {
        //     const response = await axios.post(LOGIN_URL,JSON.stringify({user,pwd,email,firstName,lastName}),
        //     {
        //         headers: {'Content-Type': 'application/json'},
        //         withCredentials:true
        //     }
        //     );
        //     setAuth('');
        //     setUser('');
        //     setPwd('');
        //     setEmail('');
        //     setFirstName('');
        //     setLastName('');
        //     setSuccess(true);
        // } catch (err) {
        //     if(!err?.response){
        //         setErrMsg('No server Response');
        //     }else if(err.response?.status === 400){
        //         setErrMsg('Missing Username or Password');
        //     }else if(err.response?.status === 401){
        //         setErrMsg('Unauthorized');
        //     }else{
        //         setErrMsg('Login Failed');
        //     }
            
        //     CodeRef.current.focus();
        // }
    }

    return (
        <>
        <AppHeader />
        <div className="title">
            <h2>Ajouter une devise:</h2>
        </div>
            <div className="container" >
            <div className="container-form">
            <form onSubmit={handleSubmit}  >
                <div className="group">      
                    <input 
                        type="text"
                        id='pays'
                        ref={PaysRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        // value={user}
                        required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Pays</label>
                </div>

                <div className="group">      
                    <input 
                        type="text"
                        id='libellé'
                        // ref={}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        // value={user}
                        required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Libellé devise</label>
                </div>

                <div className="group">      
                    <input 
                        type="number"
                        id='numero'
                        // ref={numRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        // value={user}
                        required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Numéro</label>
                </div>

                <div className="group">      
                    <input 
                        type="text"
                        id='code'
                        // ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        // value={user}
                        style={{ textTransform: "uppercase" }}
                        required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Code</label>
                </div>

                <div className="group mb-0">      
                    <input 
                        type="number"
                        id='exchangeRate'
                        // ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        // value={user}
                        required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Taux d'échange</label>
                </div>
                <div>
                    <button className="boutton mb-0">Enregistrer</button>
                </div>

            </form>
            </div>
        </div>
        </>
        
    )
}

export default ManageDevise;

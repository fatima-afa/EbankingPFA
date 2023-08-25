import React, { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import AuthContext from "../../context/AuthProvider";
import api from '../../API/axios';
import "./style.css";
import AppHeader from '../../Components/AppHeader/index';


const ManageDevise = () => {

    // const { setAuth } = useContext(AuthContext);
    const PaysRef = useRef();
    const CodeRef = useRef();

    const [dataSource, setDataSource] = useState([]);
    const [pays, setPays] = useState('');
    const [libelle, setLibelle] = useState('');
    const [code, setCode] = useState('');
    const [numero, setNumero] = useState('');
    const [tauxEchange, setTauxEchange] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const { id } = useParams();


    useEffect(() => {
        if (id) {
            // Effectuer une requête GET pour obtenir les détails de la devise existante
            api.get(`http://localhost:8888/devise/${id}`)
                .then(response => {
                    const devise = response.data;
                    setPays(devise.nom);
                    setLibelle(devise.deviseDto.libelle);
                    setNumero(devise.deviseDto.numero);
                    setCode(devise.deviseDto.code);
                    setTauxEchange(devise.deviseDto.tauxEchange);
                })
                .catch(error => {
                    console.error("Error fetching devise data:", error);
                });
        }
    }, [id]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(id){

        const dataToUpdate = {
            libelle: libelle,
            tauxEchange: tauxEchange
        };
    
        try {
            await api.patch(`http://localhost:8888/devise/${id}`, dataToUpdate);
            setSuccess(true);
            navigate('/admin/devise');
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }else{
        // Ajout d'une nouvelle devise
        const dataToAdd = {
            nom: pays,
            deviseDto: {
                code:code,
                numero:numero,
                statutDevise:"Enable",
                libelle: libelle,
                tauxEchange: tauxEchange
            }
        };

        try {
            await api.post('http://localhost:8888/devise/add', dataToAdd);
            setSuccess(true);
            navigate('/admin/devise');
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

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
                        onChange={(e) => setPays(e.target.value)}
                        value={pays}
                        required 
                        disabled={id?true:false}
                        />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    {id? null :<label>Pays</label>}
                </div>

                <div className="group">      
                    <input 
                        type="text"
                        id='libelle'
                        // ref={libelleRef}
                        autoComplete='off'
                        onChange={(e) => setLibelle(e.target.value)}
                        value={libelle}
                        required 
                        />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Libellé devise</label>
                </div>

                <div className="group">      
                    <input 
                        type="number"
                        id='numero'
                        // ref={numeroRef}
                        autoComplete='off'
                        onChange={(e) => setNumero(e.target.value)}
                        value={numero}
                        required 
                        disabled={id?true:false}
                        />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    {id? null :<label>Numéro</label>}
                </div>

                <div className="group">      
                    <input 
                        type="text"
                        id='code'
                        // ref={codeRef}
                        autoComplete='off'
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        style={{ textTransform: "uppercase" }}
                        required 
                        disabled={id?true:false}
                        />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    {id? null :<label>Code</label>}
                </div>

                <div className="group mb-0">      
                    <input 
                        type="number"
                        id='tauxEchange'
                        // ref={tauxEchangeRef}
                        autoComplete='off'
                        onChange={(e) => setTauxEchange(e.target.value)}
                        value={tauxEchange}
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

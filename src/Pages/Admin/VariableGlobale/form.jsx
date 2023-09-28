import React, { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../API/axios';
import AppHeader from '../../../Components/AppHeader/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Param = () => {

    // const { setAuth } = useContext(AuthContext);
    const PaysRef = useRef();

    const [dataSource, setDataSource] = useState([]);
    const [nom, setNom] = useState('');
    const [valeur, setValeur] = useState('');


    const navigate = useNavigate();


    const { id } = useParams();


    useEffect(() => {
        if (id) {
            // Effectuer une requête GET pour obtenir les détails de la devise existante
            api.get(`http://localhost:8888/params/${id}`)
                .then(response => {
                    const param = response.data;
                    setNom(param.nom);
                    setValeur(param.valeur);
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
            nom: nom,
            valeur: valeur
        };
    
        try {
            await api.patch(`http://localhost:8888/params/${id}`, dataToUpdate);
            // setSuccess(true);
            navigate('/admin/manageParam');
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }else{
        // Ajout d'une nouvelle devise
        const dataToAdd = {
            nom: nom,
            valeur: valeur,
            adminDto: {
                id:1
            }
        };

        try {
            await api.post('http://localhost:8888/params/save', dataToAdd);
            // setSuccess(true);
            console.log(dataToAdd);
            navigate('/admin/manageParam');
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

    }
    useEffect(() => {
        const notify = () => toast.info(`L'ajout d'une variable n'est pas autorisé. Seul le super admin peut effectuer cette action.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",});
      notify(); // Appel de notify lors du montage
      }, []);

    return (
        <>
        {id? null:
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />}
        <AppHeader />
        <div className="title">
        {id? <h2>Modifier la variable Gloable:</h2>:<h2>Ajouter une Variable Globale:</h2>}
        </div>
            <div className="container" >
            <div className="container-form">
            <form onSubmit={handleSubmit}  >
                <div className="group">      
                    <input 
                        type="text"
                        id='nom'
                        ref={PaysRef}
                        autoComplete='off'
                        onChange={(e) => setNom(e.target.value)}
                        value={nom}
                        required 
                        />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    {id? null :<label>Nom</label>}
                </div>

                <div className="group">      
                    <input 
                        type="number"
                        id='valeur'
                        // ref={libelleRef}
                        autoComplete='off'
                        onChange={(e) => setValeur(e.target.value)}
                        value={valeur}
                        required 
                        />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>La valeur du parametre</label>
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

export default Param;

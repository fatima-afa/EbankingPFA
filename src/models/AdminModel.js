import React, { useState } from 'react';

const AdminModel = () => {
  const [admin, setAdmin] = useState({
    id: null,
    nom: '',
    prenom: '',
    nomUtilisateur: '',
    matricule: '',
    password: '',
    email: '',
    CIN: '',
    adresse: '',
    dateNaissance: null, 
    statut: '', 
    sexe: '', 
    agenceDto: null, 
    profileDto: null,
  });


  // Example function to update the 'nom' field
  const updateNom = (newNom) => {
    setAdmin({
      ...admin,
      nom: newNom,
    });
  };

  // Example function to update the 'prenom' field
  const updatePrenom = (newPrenom) => {
    setAdmin({
      ...admin,
      prenom: newPrenom,
    });
  };

  // Add more functions to update other fields as needed

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default AdminModel;

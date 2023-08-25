import { Button,Table ,Avatar} from "antd";
import { EditOutlined} from "@ant-design/icons"
import { useEffect, useState } from "react";
import "./form";
import AppHeader from "../../Components/AppHeader/index";
import "./style.css";
import { useNavigate  , NavLink } from 'react-router-dom';
import api from '../../API/axios';



function Devise() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filterPays, setFilterPays] = useState(""); 
  const [filterCode, setFilterCode] = useState(""); 
  const navigate = useNavigate();
    
  useEffect(() => {
    setLoading(true);
    api.get('http://localhost:8888/devise/all')
      .then((response) => {
        const formattedData = response.data.map(item => ({
          key: item.id,
          flag: 'URL_DU_DRAPEAU', 
          nom: item.nom,
          idDevise:item.deviseDto.id,
          libelleDevise: item.deviseDto.libelle, 
          code: item.deviseDto.code.toUpperCase(),
          numero: item.deviseDto.numero,
          taux: item.deviseDto.tauxEchange,
          etat: item.deviseDto.statutDevise,
        }));
        

        // Filtrez les données en fonction des états filterPays et filterCode
        const filteredData = formattedData.filter((item) => {
          const paysMatch = item.nom.toLowerCase().includes(filterPays.toLowerCase()); 
          const codeMatch = item.code.toLowerCase().includes(filterCode.toLowerCase());
          return paysMatch && codeMatch;
        });
  
        setDataSource(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [filterPays, filterCode]);
  
  const handleEdit = (record) => {
    navigate(`/admin/manageDevise/${record}`);

  };

  const handleStateChange = (record, currentEtat) => {
    const newEtat = currentEtat === "Enable" ? "Disable" : "Enable";
  
    api.patch(`http://localhost:8888/devise/${record}`, { statutDevise: newEtat })
      .then(() => {
        // Mettez à jour l'état dans votre dataSource local pour refléter le changement immédiatement
        const updatedDataSource = dataSource.map(item =>
          item.idDevise === record ? { ...item, etat: newEtat } : item
        );
        setDataSource(updatedDataSource);
      })
      .catch(error => {
        console.error("Error updating state:", error);
      });
  };
  
  
  
  return (
    <>
      <AppHeader />
      <div className="title">
       <h2>Les devises</h2>
       <NavLink  to="/admin/manageDevise">Ajouter une devise</NavLink>
      </div>
      
      <div className="table-filter d-flex">
        <div className="p-2">
          <span>Pays</span>
          <input
            type="text"
            placeholder="Filter par pays"
            value={filterPays}
            onChange={(e) => setFilterPays(e.target.value)}
            className="filter-input "
          />
        </div> 

        <div className="p-2">
          <span>Code</span>
          <input
            type="text"
            placeholder="Filter par code"
            value={filterCode}
            onChange={(e) => setFilterCode(e.target.value)}
            className="filter-input "
          />
        </div> 
      </div>

      
      <div className="centre-container">
      <div className="table-container " >
        <Table
          className="custom-table"
          loading={loading}
          columns={[
            {
              title: "",
              dataIndex: "flag",
              render: (flag) => <Avatar src={flag} />,
            },
            {
              title: "Pays",
              dataIndex: "nom",
            },
            {
              title: "Libellé devise",
              dataIndex: "libelleDevise",
            },
            {
              title: "Code",
              dataIndex: "code",
            },
            {
              title: "Numéro",
              dataIndex: "numero",
            },
            {
              title: "Taux d'échange",
              dataIndex: "taux",
              render: (taux) => (
                <>
                  {taux} Mad
                </>
              ),
            },

            {
              title: "État",
              dataIndex: "etat",
              render: (etat, record) => (
                <span
                  style={{
                    cursor: "pointer",
                    color: etat === "Enable" ? "green" : "red", // Changez les couleurs selon vos besoins
                  }}
                  onClick={() => handleStateChange(record.idDevise, etat)}
                >
                  {etat}
                </span>
                 ),
            },
            
            {
              title: "",
              dataIndex: "action",
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (text, record) => (
                <span>
                  <Button  type="primary" size="small" onClick={() => handleEdit(record.idDevise)}><EditOutlined /></Button>
                </span>
              ),
              width: 100,
            },

          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </div>
      </div>
      
    </>
  );
}
export default Devise;
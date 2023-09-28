import { Button,Table ,Avatar} from "antd";
import { EditOutlined} from "@ant-design/icons"
import { useEffect, useState } from "react";
import api from '../../../API/axios';
import AppHeader from "../../../Components/AppHeader/index";
import { useNavigate,NavLink } from 'react-router-dom';


  function ParamsGlobale(){
    const [loading, setLoading] = useState(false);
    const [filterParam, setFilterParam] = useState(""); 
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
      setLoading(true);
      api.get('http://localhost:8888/params/all')
        .then((response) => {
          // Filtrez les données en fonction de filterParam
          const filteredData = response.data.filter((item) => {
            return item.nom.toLowerCase().includes(filterParam.toLowerCase());
          });
  
          setData(filteredData);
          setLoading(false);
          
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });

        // Filtrez les données en fonction des états filterPays et filterCode
        const filteredData = data.filter((item) => {
          const paysMatch = item.nom.toLowerCase().includes(filterParam.toLowerCase()); 
          return paysMatch;
        });
  
        setData(filteredData);
        setLoading(false);
    }, [ filterParam]);

    const handleEdit = (record) => {
      navigate(`/admin/ParamGlobale/${record}`);
    };

  return (
    <>
      <AppHeader />
      <div className="title">
       <h2>Les Variables Globales</h2>
       <NavLink  to="/admin/ParamGlobale">Ajouter une VariableGlobale</NavLink>
      </div>
      
      <div className="table-filter d-flex">
        <div className="p-2">
          <span>Nom de la variable Globale</span>
          <input
            type="text"
            placeholder="Filter par nom"
            value={filterParam}
            onChange={(e) => setFilterParam(e.target.value)}
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
              title: "Parametre globale",
              dataIndex: "nom",
            },
            {
              title: "Valeur",
              dataIndex: "valeur",
            }, 
            {
              title: 'Actions',
              key: 'actions',
              render: (text, record) => (
                <span>
                  <Button  type="primary" size="small" onClick={() => handleEdit(record.id)}><EditOutlined /></Button>
                </span>
              ),
              width: 100,
            },
          ]}
          dataSource={data.map(item => ({ ...item, key: item.id }))}
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </div>
      </div>

      
    </>
  );
}
export default ParamsGlobale;
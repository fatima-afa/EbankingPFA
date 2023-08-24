import { Button,Table ,Avatar} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons"
import { useEffect, useState } from "react";
import "./form";
import AppHeader from "../../Components/AppHeader/index";
import "./style.css";
import { Link,NavLink } from 'react-router-dom';
import api from '../../API/axios';


function Devise() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filterPays, setFilterPays] = useState(""); // New state for filter
  const [filterCode, setFilterCode] = useState(""); // New state for filter
 

  // const data = [
  //   {
  //     flag:'../../Assets/MA.png',
  //     pays:'Maroc',
  //     libelle: 'Dirham Marocaine',
  //     code:'mad',
  //     numero:'504',
  //     taux: '1',
  //     etat:'active'
  //   }];
    
  useEffect(() => {
    setLoading(true);
    api.get('http://localhost:8888/devise/all')
    .then((response) => {
      setDataSource(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });

     // Filtrez les données en fonction des états filterPays et filterCode
    //  const filteredData = data.filter((item) => {
    //   const paysMatch = item.pays.toLowerCase().includes(filterPays.toLowerCase());
    //   const codeMatch = item.code.toLowerCase().includes(filterCode.toLowerCase());
    //   return paysMatch && codeMatch;
    // });

    // setDataSource(filteredData);
    setLoading(false);

  }, [filterPays, filterCode]);

  const handleEdit = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
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
              dataIndex: "pays",
            },
            {
              title: "Libellé devise",
              dataIndex: "libelle",
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
                  <Button  type="primary" size="small" onClick={() => handleEdit(record.id)}><EditOutlined /></Button>
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
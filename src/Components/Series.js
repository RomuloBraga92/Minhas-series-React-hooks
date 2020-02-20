import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Series = () => {

    const[data, setData] = useState([]);

    useEffect(() =>{
        axios.get('/api/series')
        .then(res => {
            setData(res.data.data)
        })
    }, []);

    const deleteSerie = id =>{
        axios.delete('/api/series/' + id)
        .then(res =>{
            const dataFilter = data.filter(item => item.id !== id)
            setData(dataFilter)
        })
    }

    const addRow = serie => {
       return(
        <tr key={serie.id}>
        <th scope="row"> {serie.id}</th>
        <td>{serie.name}</td>
        <td><Button color="danger" onClick={() => deleteSerie(serie.id)}>Remover</Button>
        <Link to={"/series/" + serie.id}><Button color="warning" style={{marginLeft:"10px"}}>Info</Button></Link>
        </td>
        </tr>
       );
    }

    if(data.length===0){
        return(
            <div className="container text-center">
                <br></br><br></br>
                <h1>Séries</h1>
                <br></br>
                <Alert color="warning">
                Você não possui séries cadastradas!
                </Alert>
                <br></br>
                <Link to="/series/novo"><Button color="dark" size="lg" active>Nova série</Button></Link>
            </div>
        );
    }

    return(
        <div style={{background: "rgba(180,180,180,0.7)", height:"100vh"}}>
        <div className="container text-center">
        <br></br><br></br>
        <h1>Séries</h1>
        <br></br>
        <Table dark>
        <thead>
            <tr>
            <th>ID</th>
            <th>Série</th>
            <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {data.map(addRow)}
        </tbody>
        </Table>
        <br></br>
        <Link to="/series/novo"><Button color="dark" size="lg" active>Nova série</Button></Link>
        </div> 
        </div> 
    );

  }

export default Series;
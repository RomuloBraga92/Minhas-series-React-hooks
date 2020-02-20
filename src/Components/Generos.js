import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Generos = () => {

    const[data, setData] = useState([]);

    useEffect(() =>{
        axios.get('/api/genres')
        .then(res => {
            setData(res.data.data)
        })
    }, []);

    const deleteGender = id =>{
        axios.delete('/api/genres/' + id)
        .then(res =>{
            const dataFilter = data.filter(item => item.id !== id)
            setData(dataFilter)
        })
    }

    const addRow = gender => {
       return(
        <tr key={gender.id}>
        <th scope="row"> {gender.id}</th>
        <td>{gender.name}</td>
        <td><Button color="danger" onClick={() => deleteGender(gender.id)}>Remover</Button>
        <Link to={"/generos/" + gender.id}><Button color="warning" style={{marginLeft:"10px"}}>Editar</Button></Link>
        </td>
        </tr>
       );
    }

    if(data.length===0){
        return(
            <div className="container text-center">
                <br></br><br></br>
                <h1>Gêneros</h1>
                <br></br>
                <Alert color="warning">
                Você não possui gêneros cadastrados!
                </Alert>
                <br></br>
                <Link to="/generos/novo"><Button color="dark" size="lg" active>Novo gênero</Button></Link>
            </div>
        );
    }

    return(
        <div style={{background: "rgba(180,180,180,0.7)", height:"100vh"}}>
        <div className="container text-center">
        <br></br><br></br>
        <h1>Gêneros</h1>
        <br></br>
        <Table dark>
        <thead>
            <tr>
            <th>ID</th>
            <th>Gênero</th>
            <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {data.map(addRow)}
        </tbody>
        </Table>
        <br></br>
        <Link to="/generos/novo"><Button color="dark" size="lg" active>Novo gênero</Button></Link>
        </div> 
        </div> 
    );

  }

export default Generos;
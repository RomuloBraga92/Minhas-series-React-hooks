import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import {Redirect} from 'react-router-dom';

const NovaSerie = () => {

    const[name, setName] = useState("");
    const[sucess, setSucess] = useState(false);

    const changeHandler = event => {
      setName(event.target.value);
    }

    const adicionarSerie = () => {
      axios.post('/api/series', {
        name: name
      }).then(res => {
        setSucess(true);
      }
      )
    }


    if(sucess){
       return <Redirect to="/series"></Redirect>
    }

    return(
        <div style={{background: "rgba(180,180,180,0.7)", height:"100vh"}}>
        <div className="container text-left">
        <br></br><br></br>
        <h1>Nova série</h1>
        <br></br>

        <Form>
          <FormGroup>
            <Label for="name" className="h4">Nome da série</Label>
            <Input type="text" name="name" id="name" className="col-6" value={name}
            onChange={changeHandler}/>
          </FormGroup>
        </Form>

        <Button color="dark" size="lg" active onClick={adicionarSerie}>Adicionar</Button>
        </div> 
        </div> 
    );

  }

export default NovaSerie;
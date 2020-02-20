import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { formatPrice } from '../util/format';

const EditarGenero = ({ match }) => {

  const [name, setName] = useState("");
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    axios.get('/api/genres/' + match.params.id)
      .then(res => {
        setName(formatPrice(res.data.name))
      })
  }, [match.params.id])

  const changeHandler = event => {
    setName(event.target.value);
  }

  const editarGenero = () => {
    axios.put('/api/genres/' + match.params.id, {
      name: name
    }).then(res => {
      setSucess(true);
    }
    )
  }


  if (sucess) {
    return <Redirect to="/generos"></Redirect>
  }

  return (
    <div style={{ background: "rgba(180,180,180,0.7)", height: "100vh" }}>
      <div className="container text-left">
        <br></br><br></br>
        <h1>Editar gênero</h1>
        <br></br>

        <Form>
          <FormGroup>
            <Label for="name" className="h4">Nome do gênero</Label>
            <Input type="text" name="name" id="name" className="col-6" value={name}
              onChange={changeHandler} />
          </FormGroup>
        </Form>

        <Button color="dark" size="lg" active onClick={editarGenero}>Editar</Button>
      </div>
    </div>
  );

}

export default EditarGenero;
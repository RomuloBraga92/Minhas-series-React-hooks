import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, Label, Input, Badge } from 'reactstrap';
import {Redirect} from 'react-router-dom';

const InfoSerie = ({match}) => {

    const[form, setForm] = useState("");
    const[sucess, setSucess] = useState(false);
    const[data, setData] = useState({});
    const[mode, setMode] = useState('INFO');
    const[genres, setGenres] = useState({});
    const[genreId, setGenreId] = useState('')

    useEffect(()=>{
      axios.get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
    }, [match.params.id])

    useEffect(()=>{
      axios.get('/api/genres')
      .then(res=>{
        setGenres(res.data.data)
        const genres = res.data.data
        const founded = genres.find(value => data.genre === value.name)
        if(founded){
          setGenreId(founded.id)
        }
      })
    }, [])

    const changeHandler = field => event => {
      setForm({
        ...form,
        [field]: event.target.value
      });
    }

    const changeGenrerHandler = event => {
      setGenreId(event.target.value)
    }

    const seleciona = value => () => {
      setForm({
        ...form, 
        status: value
      })
    }

    const salvarEdicaoSerie = () => {
      axios.put('/api/series/' + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSucess(true);
      }
      )
    }

    const style_header={
      heigth: "50vh",
      backgroundImage: `url('${data.background}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat", 
    }


    if(sucess){
       return <Redirect to="/series"></Redirect>
    }

    return(
        <div> 
          <header style={style_header}>
            <div  className='h-100' style= {{background: 'rgba(0,0,0,0.7)'}}>
              <div className='h-100 container'>
                <div className='row h-100 align-items-center'>
                  <div className="col-4">
                    <img alt={data.name} className="img-fluid img-thumbnail" src={data.poster} ></img>
                  </div>
                  <div className="col-8">
                    <h1 className="font-weight-light text-white">{data.name}</h1>
                    <div className="lead text-white">
                    { data.status === 'ASSISTIDO' && <Badge color="success">Assistido</Badge>}
                    { data.status === 'PARA_ASSISTIR' &&<Badge color="warning">Para assistir!</Badge>}
                    <Badge color="info">{data.genre}</Badge>
                    </div>
                    <div className="text-white" style={{fontSize:"20px", marginTop:"20px"}}>
                      {data.comments}
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </header>
          <br></br>
          <div style={{textAlign:'center'}}><Button color="dark" size="lg" 
          active onClick={() => setMode('EDIT')}>Editar</Button></div>

        {
          mode==='EDIT' &&
        <div className="container text-left">
        <br></br><br></br>

        
        <h1>Editar série</h1>
        <br></br>
        <Button color="dark" size="lg" active onClick={() => setMode('INFO')} 
        style={{marginBottom:"20px"}}>Cancelar Edição</Button>

        <Form>
          <FormGroup>
          
            <Label for="name" className="h4">Nome da série</Label>
            <Input type="text" name="name" id="name" className="col-6 form-control" value={form.name}
            onChange={changeHandler('name')} style={{marginBottom:"20px"}}/>

            <Label for="name" className="h4">Comentários</Label>
            <Input type="text" name="name" id="name" className="col-6 form-control" value={form.comments}
            onChange={changeHandler('comments')} placeholder="Comentários" style={{marginBottom:"20px"}}/>

            <FormGroup>
              <Label for="name" className="h4">Gênero</Label>
              <Input type="select" name="select" id="select" className="col-6 form-control"
              onChange={changeGenrerHandler} style={{marginBottom:"20px"}} value={genreId}>
              {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
              </Input>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input type="radio" name="status"  checked = {form.status==='ASSISTIDO'} id="assistido" value="ASSISTIDO" onChange={seleciona('ASSISTIDO')}  />
                Assistido
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="status" checked = {form.status==='PARA_ASSISTIR'} id="para_assistir" value="PARA_ASSISTIR" onChange={seleciona('PARA_ASSISTIR')} />
                Para Assistir
              </Label>
          </FormGroup>

          </FormGroup>
        </Form>

        <Button color="dark" size="lg" active onClick={salvarEdicaoSerie}>Salvar</Button>
        </div> 
        
      }

        </div> 
      
    );

  }

export default InfoSerie;
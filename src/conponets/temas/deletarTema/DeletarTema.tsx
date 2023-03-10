import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';

import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


    function DeletarTema() {
        let navigate = useNavigate();
        const { id } = useParams<{id: string}>();
        const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens)
        const [tema, setTema] = useState<Tema>()
    
        useEffect(() => {
            if (token == "") {
              toast.success("Voce precisa estar logado!",{
                position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                navigate("/login")
        
            }
        }, [token])
    
        useEffect(() =>{
            if(id !== undefined){
                findById(id)
            }
        }, [id])
    
        async function findById(id: string) {
            buscaId(`/temas/${id}`, setTema, {
                headers: {
                  'Authorization': token
                }
              })
            }
    
            function sim() { // vai para tela de temas para poder deletar 
              navigate('/temas')
                deleteId(`/temas/${id}`, {
                  headers: {
                    'Authorization': token
                  }
                });
                toast.success("Tema deletado com sucesso!",{
                  position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                  })
              }
            
              function nao() { // não tem nenhuma funcionalidade ela fica na mesma tela 
                navigate('/temas')
              }
    return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                {tema?.descricao} 
              </Typography>
              <Typography color="textSecondary">
                tema
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button  onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
// <Typography> aonde estava escrito deletar tema foi alterado para ( {tema?.descricao})
// no botão foi colocado tbm um onClick={sim e nao} ns dois botoes
export default DeletarTema;
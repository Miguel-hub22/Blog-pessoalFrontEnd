import React, { useEffect, useState } from 'react'
import {Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import {Box} from '@mui/material';
import './DeletarPostagem.css';
import { useNavigate, useParams } from 'react-router-dom';

import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function DeletarPostagem() {
    let navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
      
      )
      
      const [post, setPosts] = useState<Postagem>()
      
    useEffect(() => { // sempre verifica se usuario esta logado ou não 
        if (token == "") {
          toast.error("Voce precisa estar logado!",{
            position: "top-right",
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

    async function findById(id: string) { // buscar sempre o id
        buscaId(`/postagens/${id}`, setPosts, {
            headers: {
              'Authorization': token
            }
          })
        }

        function sim() { // deletar ou não 
          navigate('/posts')
            deleteId(`/postagens/${id}`, {
              headers: {
                'Authorization': token
              }
            });
            toast.success("Deletada postagem com sucesso!",{
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
        
          function nao() { // não faz nada 
            navigate('/posts')
          }
   
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                Sim
              </Button>
              </Box>
              <Box>
              <Button  onClick={nao} variant="contained" size='large' color="secondary">
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
//dentro do textfield colococar o {post?.titulo}
// colocar no <form onSubmit={onSubmit}> e por o codigo da plataforma 
export default DeletarPostagem;

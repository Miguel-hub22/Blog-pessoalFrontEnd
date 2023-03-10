import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import {Box} from '@mui/material';
import './ListaPostagem.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { busca } from '../../../services/Service';
import Postagem from '../../../models/Postagem';
import { toast } from 'react-toastify';


function ListaPostagem() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState<Postagem[]>([])
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
)
  useEffect(() => {
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

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length])

  return (
    <>
    {posts.map(post => (
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>
            <Typography variant="h5" component="h2">
              {post.titulo}
            </Typography>
            <Typography variant="body2" component="p">
            {post.texto}
            </Typography>
            <Typography variant="body2" component="p">
            Postado em:{' '}
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: 'full',
                  timeStyle: 'medium',
                }).format(new Date(post.data))}
            Tema: {post.tema?.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>

            <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
    ))}
    </>
  )
}

export default ListaPostagem;
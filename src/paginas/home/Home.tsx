import React, { useEffect } from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import {Box} from '@mui/material';
import './Home.css';
import  { useNavigate, Link } from 'react-router-dom'
import TabPostagem from '../../conponets/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../conponets/postagens/modalPostagem/ModalPostagem';


import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
 

function Home() {

    let history = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    
    
    useEffect(() => {
    if (token == "") {
        alert("Você precisa estar logado")
        history("/login")

    }
}, [token])

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ backgroundColor: "#3F51B5" }}>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ color: "white", fontWeight: "bold" }}>Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" style={{ color: "white", fontWeight: "bold" }}>Helo Word</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                        <ModalPostagem />
                        </Box>
                        <Link to='/posts' className='text-decorator-none'>
                        <Button variant="outlined" style={{ borderColor: "white", backgroundColor: "#3F51B5", color: "white" }}>Ver Postagens</Button>
                    </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://matriculas.estacio.br/blog/wp-content/uploads/2019/01/rotina-de-estudos-faculdade-estrategias-para-acertar-estacio.jpg" alt="" width="500px" height="500px" />
                </Grid>
                <Grid xs={12} style={{ backgroundColor: "white" }}>
                    <TabPostagem/>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;
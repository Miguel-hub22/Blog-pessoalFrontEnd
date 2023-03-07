import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid,Typography, TextField, Button } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import './Login.css';
import Userlogin from '../../models/UserLogin';
import { login } from '../../services/Service';



function Login() {

    let history = useNavigate();
    const [token, setToken] = useLocalStorage('token');
    
    const [userLogin, setUserLogin] = useState<Userlogin>(
        {
        id: 0,
        usuario:'',
        senha:'',
        foto:'',
        tokem:'',
    }
)
function updatedModel(e: ChangeEvent<HTMLInputElement>) {

    setUserLogin({
        ...userLogin,
        [e.target.name]: e.target.value
    })
}
        async function onSubimit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            await login(`/usuarios/logar`, userLogin, setToken)
            alert('Usuário logado com sucesso!');
        }catch(error) {
            alert('Dados do usuário inconsistentes. Erro ao logar!');
        }
    }
    useEffect(()=>{
        if(token != ''){
            history('/home')
        }
    }, [token])


    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' style={{fontWeight: 'bold'}}>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={ (e:ChangeEvent<HTMLInputElement>) =>  updatedModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={ (e:ChangeEvent<HTMLInputElement>) =>  updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password'fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            
                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>
                            
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario'>
                            <Typography variant='subtitle1' gutterBottom align='center' style={{fontWeight: 'bold'}}>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} style={{
                backgroundImage: `url(https://matriculas.estacio.br/blog/wp-content/uploads/2019/01/rotina-de-estudos-faculdade-estrategias-para-acertar-estacio.jpg)`,
                backgroundRepeat: 'no-repeat', width: '100vh', minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'center'
            }}>

            </Grid>
        </Grid>

    );
        }


export default Login;

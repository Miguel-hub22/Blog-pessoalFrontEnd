import React , {useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Grid,Typography, Button, TextField } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';

function CadastroUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
        id: 0,
        usuario:'',
        senha:'',
        foto:'',
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            usuario:'',
            senha:'',
            foto:'',
        })

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        try{
            if(confirmarSenha == user.senha && confirmarSenha !='') {
            await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            alert('Usuario cadastrado com sucesso')

            }else{
                alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
            }
        }catch{
            alert('Dados incoplento')

        }
        }
    
    return (
        <Grid container direction='row-reverse'  justifyContent='center' alignItems='center'>
            <Grid item xs={6}> <img src="https://matriculas.estacio.br/blog/wp-content/uploads/2019/01/rotina-de-estudos-faculdade-estrategias-para-acertar-estacio.jpg" alt="" /></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={12}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal'fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}  id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='botoes'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                    Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>



        </Grid>
    );
}

export default CadastroUsuario;
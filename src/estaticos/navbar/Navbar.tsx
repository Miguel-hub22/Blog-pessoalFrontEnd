import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import {Box} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { addToken } from '../../store/tokens/actions';


function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens)
        let history = useNavigate();
        const dispatch = useDispatch();

    function goLogout(){
        
        alert("Usuário deslogado")
        dispatch(addToken(''));
        history('/login')
    }
    var navBarComponent;

        if(token !='')

        navBarComponent = <AppBar position="static">
        <Toolbar variant="dense">
            <Box style={{ cursor: "pointer" }} >
                <Typography variant="h6" color="inherit">
                    Blog Pessoal
                </Typography>
            </Box>

                <Box  mx={1} style={{ cursor: "pointer" }}>
                <Link to="/home" >
                    <Box margin={1}  display="flex" justifyContent="start">
                    <Link className='link' to='/home'>
                    <Typography className='curso' variant="h6" color="inherit">
                        Home
                    </Typography>
                    </Link>
                    </Box>
                    </Link>

                    <Link to="/posts">
                <Box mx={1} style={{ cursor: "pointer" }}>
                    <Typography variant="h6" color="inherit">
                        Postagens
                    </Typography>
                </Box>
                </Link>

                <Link to="/temas">
                <Box mx={1} style={{ cursor: "pointer" }}>
                    <Typography variant="h6" color="inherit">
                        Temas
                    </Typography>
                </Box>
                </Link>

                <Link to="/formularioTema" >
                <Box mx={1} style={{ cursor: "pointer" }}>
                    <Typography variant="h6" color="inherit">
                        Cadastrar Tema
                    </Typography>
                </Box>
                </Link>
                <Box mx={1} style={{ cursor: "pointer" }}>
                    <Link className='link' to='/login'>
                    <Typography className='curso' variant="h6" color="inherit">
                        Login
                    </Typography>
                    </Link>
                    
                </Box>
                
            </Box>

        </Toolbar>
    </AppBar>

    return (
        <> 
            {navBarComponent}
        </>
    )
}



export default Navbar;      
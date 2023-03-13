import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import {Box} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { addToken } from '../../store/tokens/actions';
import './Navbar.css'
import { toast } from 'react-toastify';


function Navbar(): JSX.Element {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens)
        let history = useNavigate();
        const dispatch = useDispatch();

    function goLogout(){
        
        dispatch(addToken(''));
        
        toast.info("Usuário deslogado",{
            position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        history('/login')
    }
    var navBarComponent;

        if(token !='')

        navBarComponent = <AppBar position="static">
        <Toolbar variant="dense" className='estilo'>
            <Box className='cursor'>
                <Typography variant="h5" color="inherit">
                    Blog Pessoal
                </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
                <Link to="/home" className="text-decorator-none">
                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit">
                            Home
                        </Typography>
                    </Box>
                </Link>
                <Link to="/posts" className="text-decorator-none">
                    <Box mx={1} className='cursor'>
                        <Typography variant="h6" color="inherit">
                            Postagens
                        </Typography>
                    </Box>
                </Link>
                <Link to="/temas" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <Typography variant="h6" color="inherit">
                        Temas
                    </Typography>
                </Box>
                </Link>
                <Link to="/formularioTema" className="text-decorator-none">
                <Box mx={1} className='cursor'>
                    <Typography variant="h6" color="inherit">
                        Cadastrar tema
                    </Typography>
                </Box>
                </Link>

                    <Box mx={1} className='cursor' marginLeft={2} onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                            Login
                        </Typography>
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

import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../models/Tema';
import { useNavigate, useParams } from 'react-router-dom';

import { buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';



function CadastroTema() 
{
    let navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => { // se não tiver token vai para o login
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

    useEffect(() =>{ // conferi se tem id
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) { //ele busca o id se tiver cadastrado 
        buscaId(`/temas/${id}`, setTema, {
            headers: {                   // se existir ele gera o token 
              'Authorization': token
            }
          })
        }

        function updatedTema(e: ChangeEvent<HTMLInputElement>) {

            setTema({
                ...tema,
                [e.target.name]: e.target.value,
            })
    
        }
        
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) { // colocar a função async para cadastrar novos temas ou atualizar
            e.preventDefault()
            console.log("tema " + JSON.stringify(tema))
    
            if (id !== undefined) {
                console.log(tema)
                put(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success("Tema atualizado com sucesso",{
                    position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
            } else {
                post(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success("Tema cadastrado com sucesso",{
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
            back() //voltar para temas cadrastrados
    
        }
    
        function back() {
            navigate('/temas')
        }
  
    return (
        <Container maxWidth="sm" className="topo"> 
        <form onSubmit={onSubmit}> 
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >{tema.id != 0? 'Edite o tema': 'Cadastre um tema'}</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}
//dentro do textfield colococar o ={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
// colocar no <form onSubmit={onSubmit}> e por o codigo da plataforma 
export default CadastroTema;
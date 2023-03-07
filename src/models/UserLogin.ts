interface Userlogin{
    id: number;
    usuario: string;
    senha: string;
    foto: string;
    tokem?: string| null
}
export default Userlogin;
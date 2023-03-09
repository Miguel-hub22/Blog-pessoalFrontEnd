interface Userlogin{
    id: number;
    usuario: string;
    senha: string;
    foto: string;
    token?: string | null
}
export default Userlogin;
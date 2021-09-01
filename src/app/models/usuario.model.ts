export class UsuarioModel {

    idUsuario:string;
    nombreUsuario:string;
    apellidoUsuario:string;
    email:string;
    contrasena:string;
    acudiente?:string;
    tipoUsuario:string;
    grupo?:string;
    estado:boolean;

    constructor(){
        //Tipo usuario 2 por ser cliente
        this.tipoUsuario="2";
        this.estado = false;
    }

}
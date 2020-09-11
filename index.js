//<i class="fab fa-galactic-senate"></i>
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarCampo = (expresion, input, campo)=> {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-old-republic");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-galactic-senate");
        document.querySelector(`#grupo__${campo} p`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-galactic-senate");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-old-republic");
        document.querySelector(`#grupo__${campo} p`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}

const validarContraseña2 = () => {
    const inputpassword1= document.querySelector('#contraseña').value;
    const inputpassword2= document.querySelector('#contraseña2').value;
    if(inputpassword2 !== inputpassword1 || inputpassword2==""){
        document.getElementById("grupo__contraseña2").classList.add("formulario__grupo-incorrecto");
        document.querySelector("#grupo__contraseña2 i").classList.remove("fa-galactic-senate");
        document.querySelector("#grupo__contraseña2 i").classList.add("fa-old-republic");
        document.querySelector("#grupo__contraseña2 p").classList.add("formulario__input-error-activo");
        campos['password'] = false;
    }else{
        document.getElementById("grupo__contraseña2").classList.remove("formulario__grupo-incorrecto");
        document.getElementById("grupo__contraseña2").classList.add("formulario__grupo-correcto");
        document.querySelector("#grupo__contraseña2 i").classList.remove("fa-old-republic");
        document.querySelector("#grupo__contraseña2 i").classList.add("fa-galactic-senate");
        document.querySelector("#grupo__contraseña2 p").classList.remove("formulario__input-error-activo");
        campos['password'] = true;
    }
}


const validarFormulario = (e) =>{

        
    switch (e.target.name){
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
        break
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break
        case "contraseña":
            validarCampo(expresiones.password, e.target, 'contraseña');
            validarContraseña2();
        break
        case "contraseña2":
            validarContraseña2();
        break
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
        break
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break
    }
 
}


inputs.forEach((input)=>{
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
    
})

formulario.addEventListener('submit', (e)=>{
    const terminos = document.getElementById('terminos');
    e.preventDefault();//si activamos el formulario con php hay que elimnar esto
    if(campos.usuario && campos.nombre && campos.password && campos.correo  && campos.telefono && terminos.checked == true){
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')

        setTimeout(()=>{
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
        }, 5000)
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono)=>{
            icono.classList.remove('formulario__grupo-correcto')
        });
    }else{
        const error = document.getElementById('formulario__mensaje');
        error.classList.add('formulario__mensaje-activo');
    }
});

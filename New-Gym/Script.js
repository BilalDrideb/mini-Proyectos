window.addEventListener('DOMContentLoaded', () => {
    // inicializacion de variables 
    let acc=0;
   let total=0;

   const agregar=document.querySelector("#agregarAlCarrito");
   
   agregar.addEventListener("click",e=>{
      acc++;
      if(acc<=7){
        e.preventDefault();
        let actividad=document.querySelector("#actividades").value;
        let formaPago=document.querySelector("#cuotas").value;
        if(actividad!='nada' && formaPago!='nada'){
         peticionAjax(actividad,formaPago,addCarrito);
        }else{
            error();
        }
      }else{
          e.target.value="Tu carrito esta demasiado lleno";
      }
      
    
   })

   function peticionAjax(actividad,formaPago,callback){
       const req=new XMLHttpRequest();
       req.onreadystatechange=function(){
        if(req.readyState==4){
            if(req.status==200){
                // llamamos a nuestro callback y le pasamos la respuesta del php.
                let respuesta=this.responseText;
                callback(actividad,formaPago,respuesta);
               
            }
        }
       }
    //    aqui enviamos los datos a nuestro servidor;
    req.open("GET","Server.php?actividad="+actividad);
    req.send();
   }



   function addCarrito(actividad,formaPago='mensual',respuesta){
    let mensajeError=document.querySelector('#error');
    let calcular=document.querySelector('#calcular');
    if(mensajeError){
        mensajeError.remove();
    }
    let ul=document.createElement("UL");
    let nombreActividad=document.createElement("LI");
    nombreActividad.setAttribute("class","filaActividad");
    let cuotas=document.createElement("LI");
    let precio=document.createElement("LI");
    nombreActividad.textContent=actividad;
    cuotas.textContent=formaPago;
    precio.textContent=respuesta;
    // añadir al carrito
    let carrito=document.querySelector("#carrito");
    ul.appendChild(nombreActividad);
    ul.appendChild(cuotas);
    ul.appendChild(precio);
    carrito.appendChild(ul);
    carrito.style.display="block";
    // sumar la quotas y el total
    // newRespuesta=parseInt(respuesta,10);
    respuesta=respuesta*1;
    let subtotal=calcularTotal(formaPago,respuesta);
     total=total+subtotal;

    const btnCalcular=document.querySelector('#calcular');
    btnCalcular.onclick=function(){
        imprimirTotal(total,btnCalcular);
    };
   }

//    funcion error en el caso de que no selecione nada
function error(){
    let mensajeError=document.querySelector('#error');
        mensajeError.style.display="block";
}

// calcularEltotal
function calcularTotal(formaPago,precio){
    if(formaPago=='trimestral'){
        precio=precio*3;
    }else if(formaPago=='semestral'){
        precio=precio*6;
    }else if(formaPago=='anual'){
        precio=precio*12;
    }
    return precio;
}
// imprimir el total 
function imprimirTotal(total,btnCalcular){
    // una vez el usuario ha hecho click le damos mostramos el spinner
    btnCalcular.style.display="none";
    const spinner=document.querySelector(".spinner");
    spinner.style.display="block";
    setTimeout(()=>{
       spinner.style.display="none";
       btnCalcular.value=`${total}$`;
       btnCalcular.style.display="block";
    },2000)
    

    setTimeout(()=>{
        btnCalcular.value="Calcular total";
     },5000)

    
}



















})

const btnEnviar = document.querySelector('#siguiente')
let campoName =  (document.getElementById('nombre') as HTMLInputElement | null)
let campoCorreo = (document.querySelector('#correo') as HTMLInputElement | null)
let card = (document.querySelector('#card') as HTMLElement | null)
let boxDots = (document.querySelector('#dots') as HTMLElement | null)
let step = (document.querySelector('#step') as HTMLElement | null)

type Informacion = {
    name: string,
    email: string,
    area:number[],
}

let informacionForm: Informacion = {
    name: '',
    email: '',
    area: []
}

function limpiarHtml(clase:HTMLElement):void{
    while(clase.firstChild){
        clase.removeChild(clase.firstChild)
    }

}


function marcar(e:MouseEvent):void {
    const targetElement = e.target as HTMLElement; // Castear a HTMLElement
    if (targetElement && targetElement.id) {
        targetElement.classList.toggle('info-active');

        const idToNumber: { [key: string]: number } = {
            '1': 1,
            '2': 2,
            '3': 3,
        };

        const numeroAEliminar = idToNumber[targetElement.id];
        const indiceDelNumero = informacionForm.area.indexOf(numeroAEliminar);

        if (indiceDelNumero !== -1) {
            informacionForm.area.splice(indiceDelNumero, 1);
        } else {
            informacionForm.area.push(numeroAEliminar);
        }
    }
}


function validarCampos(e: Event):void {
    e.preventDefault()
    let validEmail = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)

    if( ((campoName?.value.trim( ) !== '') && (campoName!== null)  && (campoName.value !== undefined)) 
        && validEmail.test(campoCorreo?.value.trim() || '') && campoCorreo?.value) {
        informacionForm.name = campoName.value;
        informacionForm.email = campoCorreo.value
        dibujarPaso2();
    } else {
        campoName?.classList.add('border-red-400')
        campoCorreo?.classList.add('border-red-400')
        setTimeout(() => {
            campoName?.classList.remove('border-red-400')
            campoCorreo?.classList.remove('border-red-400')
        }, 2000);
    }
}

function dibujarPaso2():void{
    // Titulo del card
    let titulo = card?.querySelector('h3') as HTMLElement | null 

    // rellenar el boton
    let enlace = document.createElement('a')
    enlace.href = '#'
    enlace.classList.add("cursor-pointer", "bg-m-morado", "text-m-white", "py-3", "px-12", "mt-4", "rounded-3xl", "text-sm", "transition-all", "duration-100", "active:bg-m-l-morado", "text-center")
    enlace.textContent = "Continue"
    enlace.onclick = dibujarPaso3


    // Elecciones
    let div = document.createElement('div')
    div.classList.add('flex', 'flex-col', 'gap-4','w-full')


    let opcion1 = document.createElement('p') 
    let opcion2 = document.createElement('p')
    let opcion3 = document.createElement('p')

    opcion1.id = '1'
    opcion2.id = '2'
    opcion3.id = '3'

    opcion1.onclick = marcar
    opcion2.onclick = marcar
    opcion3.onclick = marcar

    opcion1.classList.add('border', 'bg-m-gray', 'py-4', 'px-4', 'border-[2.6px]', 'border-m-l-gray', 'cursor-pointer', 'w-full', 'text-m-sl-gray', 'rounded-xl')
    opcion2.classList.add('border', 'bg-m-gray', 'py-4', 'px-4', 'border-[2.6px]', 'border-m-l-gray', 'cursor-pointer', 'w-full', 'text-m-sl-gray', 'rounded-xl')
    opcion3.classList.add('border', 'bg-m-gray', 'py-4', 'px-4', 'border-[2.6px]', 'border-m-l-gray', 'cursor-pointer', 'w-full', 'text-m-sl-gray', 'rounded-xl')

    opcion1.textContent = 'Software Development' 
    opcion2.textContent = 'User Experience'
    opcion3.textContent = 'Grapich Design'

    div.appendChild(opcion1)
    div.appendChild(opcion2)
    div.appendChild(opcion3)
    

    
    // Elemento contenedor
    let contenidoFormulario = document.querySelector('form') as HTMLElement
    contenidoFormulario.classList.remove('mt-10')
    contenidoFormulario.classList.add('mt-4')
    limpiarHtml(contenidoFormulario)
    contenidoFormulario?.appendChild(div)
    contenidoFormulario?.appendChild(enlace)

    if(titulo !== null) {
        titulo.textContent = 'Which topics you are interested in?'
    }

    // Cambiar boton activo
    boxDots?.children[0].classList.remove('active')
    boxDots?.children[1].classList.add('active')

    // Paso siguiente
    if(step?.textContent !== null && step?.textContent !== undefined){
        step.textContent = '2';
    }
    
}

function dibujarPaso3():void {
    console.log(informacionForm);
    let titulo = card?.querySelector('h3') as HTMLElement | null 
    let contenidoFormulario = document.querySelector('form') as HTMLElement

    if(titulo !== null){
        titulo.textContent = 'Sumary'
    } 


    // Crear resumen
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const lista = document.createElement('ul')

    div1.innerHTML = `
        <p class="text-m-sl-gray block">Name: <span class="text-m-white">${informacionForm.name}</span> </p>
        <p class="text-m-sl-gray block">Email: <span class="text-m-white">${informacionForm.email}</span> </p>
    `
    div2.innerHTML = `
        <p class="text-m-sl-gray">Topics:</p>
    `

    if(informacionForm.area.length !== 0){
        informacionForm.area.forEach(elemento => {
            const li = document.createElement('li')
    
            li.classList.add('text-m-white', 'list-disc', 'list-inside')
    
            elemento === 1? li.textContent = 'Software Development' :
            elemento === 2? li.textContent = 'User Experience' :
            elemento === 3? li.textContent = 'Graphic Design' : null
    
            lista.appendChild(li)
        })    
    }
    else {
        const li = document.createElement('li')
        li.classList.add('text-m-white', 'list-disc', 'list-inside')
        li.textContent = "No se ha seleccionado ningun interes"
        lista.appendChild(li)
    }
    
    div2.appendChild(lista)
    limpiarHtml(contenidoFormulario)

    // Cambiar boton activo
    boxDots?.children[1].classList.remove('active')
    boxDots?.children[2].classList.add('active')

    // Paso siguiente
    if(step?.textContent !== null && step?.textContent !== undefined){
    step.textContent = '3';
    }

    contenidoFormulario.appendChild(div1)
    contenidoFormulario.appendChild(div2)

    let enlace = document.createElement('a')
    enlace.href = '#'
    enlace.classList.add("cursor-pointer", "bg-m-morado", "text-m-white", "py-3", "px-12", "mt-4", "rounded-3xl", "text-sm", "transition-all", "duration-100", "active:bg-m-l-morado", "text-center")
    enlace.textContent = "Confirmar"
    enlace.onclick = () => {
        alert('✅ Success')
    }

    contenidoFormulario.appendChild(enlace)
}

document.addEventListener('DOMContentLoaded',() => {
    btnEnviar?.addEventListener('click', (e)=> {
        validarCampos(e);
    })
})  


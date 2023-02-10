const sectionPoder = document.getElementById('seleccionar-poder')
const sectionReiniciar = document.getElementById('reiniciar')
const btnreiniciar = document.getElementById('btn-reiniciar')
const botonMascota = document.getElementById('btn-mascota')

const sectionMascota = document.getElementById('seleccionar-mascota')
const mascota = document.getElementById('nombre-mascota')

const mascotaEnemigo = document.getElementById('nombre-mascota-enemiga')

const spamvidas = document.getElementById('vidas-mascota')
const spamVidasEnemigas = document.getElementById('vidas-enemigas')

const sectionResultado = document.getElementById('resultado')
const sectionAtaque = document.getElementById('ataque')
const sectionAtaqueEnemigo = document.getElementById('ataque-enemigo')
const nuevoAtaque = document.createElement('p')
const nuevoAtaqueEnemigo = document.createElement('p')

const sectionMensaje = document.getElementById('resultado')

const tarjetas = document.getElementById('tarjetas')
const ataquesMascotas = document.getElementById('ataquesMascostas')

let mokepones = []
let ataqueJugador = []
let botones = []
let ataqueEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let tarjetaMokepon
let ataque
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugardor
let ataqueMokepon
let ataqueMokeponEnemigo
let btnFuego
let btnAgua
let btnTierra
let vidas = 3
let vidasEnemigas = 3

class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre
    this.foto = foto
    this.vida = vida
    this.ataques = []
  }
}

let hipodoge = new Mokepon('Hipodoge', 'img/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', 'img/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', 'img/mokepons_mokepon_ratigueya_attack.png', 5)

hipodoge.ataques.push(
  { nombre: '💦', id: 'btn-agua' },
  { nombre: '💦', id: 'btn-agua' },
  { nombre: '💦', id: 'btn-agua' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🌱', id: 'btn-tierra' },
)

capipepo.ataques.push(
  { nombre: '🌱', id: 'btn-tierra' },
  { nombre: '🌱', id: 'btn-tierra' },
  { nombre: '🌱', id: 'btn-tierra' },
  { nombre: '💦', id: 'btn-agua' },
  { nombre: '🔥', id: 'btn-fuego' },

)

ratigueya.ataques.push(
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '🔥', id: 'btn-fuego' },
  { nombre: '💦', id: 'btn-agua' },
  { nombre: '🌱', id: 'btn-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
  sectionPoder.style.display = 'none'
  sectionReiniciar.style.display = 'none'
  mokepones.forEach((mokepon) => {
    tarjetaMokepon = `
      <div class="tarjeta">
        <label for=${mokepon.nombre} class="nombre-mascota">
          <input type="radio" name="mascota" id=${mokepon.nombre} />
          <p>${mokepon.nombre}</p>
          <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
      </div>`
    tarjetas.innerHTML += tarjetaMokepon

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
  })
  botonMascota.addEventListener('click', seleccionarMascota)
  btnreiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascota() {
  sectionMascota.style.display = 'none'
  sectionPoder.style.display = 'flex'
  if (inputHipodoge.checked) {
    mascota.innerHTML = inputHipodoge.id
    mascotaJugardor = inputHipodoge.id
  } else if (inputCapipepo.checked) {
    mascota.innerHTML = inputCapipepo.id
    mascotaJugardor = inputCapipepo.id
  } else if (inputRatigueya.checked) {
    mascota.innerHTML = inputRatigueya.id
    mascotaJugardor = inputRatigueya.id
  } else {
    alert("Seleciona una mascota.")
  }
  extraerAtaques(mascotaJugardor)
  enemigo()
}


function extraerAtaques(mascotaJugador) {
  let ataques
  for (let index = 0; index < mokepones.length; index++) {
    if (mascotaJugador === mokepones[index].nombre) {
      ataques = mokepones[index].ataques
    }
  }
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataqueMokepon = `
    <button class="btn-poder btn-ataque" id=${ataque.id}>${ataque.nombre}</button>`

    ataquesMascotas.innerHTML += ataqueMokepon
  })
  btnFuego = document.getElementById('btn-fuego')
  btnAgua = document.getElementById('btn-agua')
  btnTierra = document.getElementById('btn-tierra')
  botones = document.querySelectorAll('.btn-ataque')
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push('Fuego')
        console.log(ataqueJugador)
        boton.style.background = 'Tomato'
      } else if (e.target.textContent === "💦") {
        ataqueJugador.push('Agua')
        console.log(ataqueJugador)
        boton.style.background = 'DodgerBlue'
      } else {
        ataqueJugador.push('Tierra')
        console.log(ataqueJugador)
        boton.style.background = 'Peru'
      }
      aleatorioAtaque()
    })
  })
}

function enemigo() {
  let enemigo = aleatorio(mokepones.length - 1, 1)
  mascotaEnemigo.innerHTML = mokepones[enemigo].nombre
  ataqueMokeponEnemigo = mokepones[enemigo].ataques
  secuenciaAtaque()
}

function aleatorioAtaque() {
  let ataqueAleatorio = aleatorio(ataqueMokeponEnemigo.length - 1, 1)
  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push('Fuega')
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push('Agua')
  } else {
    ataqueEnemigo.push('Tierra')
  }
  iniciarCombate()
}

function iniciarCombate() {
  if (ataqueJugador.length === 5) {
    combate()
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
  for (let indice = 0; indice < ataqueJugador.length; indice++) {
    if (ataqueJugador[indice] === ataqueEnemigo[indice]) {
      indexAmbosOponentes(indice, indice)
      crearEmpate("Empate")
    }
  }

  if (ataque == ataqueEnemigo) {
    mensaje("Empate 😐")
  } else if (ataque == 'Fuego' && ataqueEnemigo == 'Tierra') {
    mensaje("Ganaste 🎉")
    vidasEnemigas--
    spamVidasEnemigas.innerHTML = vidasEnemigas
  } else if (ataque == 'Agua' && ataqueEnemigo == 'Fuego') {
    mensaje("Ganaste 🎉")
    vidasEnemigas--
    spamVidasEnemigas.innerHTML = vidasEnemigas
  } else if (ataque == 'Tierra' && ataqueEnemigo == 'Agua') {
    mensaje("Ganaste 🎉")
    vidasEnemigas--
    spamVidasEnemigas.innerHTML = vidasEnemigas
  } else {
    mensaje("Perdiste 😶‍🌫️")
    vidas--
    spamvidas.innerHTML = vidas
  }
  if (vidasEnemigas == 0) {
    mensajeFinal('Ganaste, El juego acabo.')
  } else if (vidas == 0) {
    mensajeFinal('Perdiste, El juego acabo.')
  }
}

function mensaje(resultado) {
  sectionResultado.innerHTML = resultado

  nuevoAtaque.innerHTML = indexAtaqueJugador
  nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

  sectionAtaque.appendChild(nuevoAtaque)
  sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function mensajeFinal(resultadoCombate) {
  sectionReiniciar.style.display = 'block'
  sectionMensaje.innerHTML = resultadoCombate
  btnFuego.disabled = true
  btnAgua.disabled = true
  btnTierra.disabled = true
}

function aleatorio(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function reiniciarJuego() {
  location.reload()
}

window.addEventListener('load', iniciarJuego)

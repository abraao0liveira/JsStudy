// JavaScript Assíncrono e Promises

setTimeout(function(){
    console.log('hello')
}, 1000) // setTimeout, basicamente uma função com um delay pre-determinado.


function imprimir(dado){
    console.log('é isso')
    console.log(dado()) // CallBack.
} 
imprimir(function(){
    return 'hello'
})

let aceitar = false
console.log('Seus dados estão sendo armazenados...')

const promessa = new Promise( (resolve, reject) => {
    if(aceitar) { 
        return resolve("Seus dados foram salvos com sucesso!")
    }
    else {
        return reject("Erro!")
    }
} ) // Constante promessa que puxa uma promessa com uma função CallBack

console.log('Aguarde')

promessa
.then(result => console.log(result)) // Fulfilled.
.catch(erro => console.log(erro)) // Reject.
.finally(() => console.log('Processo finalizado!')) // Setled. 


// Um encadiamento de promessas.
fetch('https://api.github.com/users/abraao0liveira') // puxo a api
.then( response => response.json()) // transformo em json
.then(data => fetch(data.repos_url)) // puxo um dado dentro da api
.then(res => res.json()) // transformo ele em json 
.then(d => console.log(d)) // mostro na tela o dado
.catch(erro => console.log(erro)) // Mostra algum erro

import axios from 'axios'
axios.get('https://api.github.com/users/abraao0liveira')
.then(response => axios.get(response.data.repos_url))
.then(repos => console.log(repos.data))
.catch(error => console.log(error))

import axios from 'axios'
Promise.all([
    axios.get('https://api.github.com/users/abraao0liveira'),
    axios.get('https://api.github.com/users/abraao0liveira/repos')
])
.then(responses => {
    console.log(responses[0].data.login)
    console.log(responses[1].data.length)
})
.catch(error => console.log(error.message))

// Async/Await
const promise = new Promise( function (resolve, reject){ 
    return resolve('OK!')
})

async function start(){
    try {
        const result = await promise
        console.log(result)
    } catch(error) {
        console.log(error)
    } finally {
        console.log('Sempre rodando')
    }
}

start() 

// Add o fetch
async function start(){
    const url = "https://api.github.com/users/abraao0liveira";
    const user = await fetch(url)
    .then(r => r.json());
    const userRepos = await fetch(user.repos_url)
    .then(r => r.json());
    console.log(userRepos);
}

start().catch(error => console.log(error));


// Com Axios
import axios from 'Axios'
async function fetchRepos(){
    try  {
        const user = await axios.get('https://api.github.com/users/abraao0liveira');
    const repos = await axios.get(user.data.repos_url);
    console.log(repos.data);
    } catch (error) {
        console.log(error);
    }
}

fetchRepos();
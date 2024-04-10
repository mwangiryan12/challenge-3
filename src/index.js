
// Your code here
let movie = "https://api-vik-server.onrender.com/films"// shows the localhost used
//uses dom to declare function
document.addEventListener('DOMContentLoaded', async(event)=>{
const data = await showFilms()
viewPoster(data)
movieTitle(data)
calculateTickets()
})
ticketsFilm()
//function to get movie titles
function showFilms(){
    return fetch(movie,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    })
    .then(res =>res.json())
    .then(data => data)
}

const ul = document.getElementById("films")
function ticketsFilm(){
    return fetch(movie)
    .then(res =>res.json())
    .then(title => title.map(movies =>{
        let li =document.createElement("li");
        li.innerHTML=`
        <div>
        <h2 id="${movies.id}" class="photos">${movies.title}</h2>
        </div>
        `
        ul.appendChild(li)
    }))
}

function movieTitle(data){
    const titles = document.getElementById("showing")
    const display=document.querySelectorAll(".photos")
    display.forEach(action =>{
        action.addEventListener("click", (event)=>{
            const watch = data.find((element)=> element.id===event.target.id)
            titles.innerHTML=`
            <div class="card">
            <div id="title" class="title">${watch.title}</div>
            <div id="runtime" class="meta">${watch.runtime} minutes</div>
            <div class="content">
              <div class="description">
                <div id="film-info">${watch.description}</div>
                <span id="showtime" class="ui label">${watch.showtime}</span>
                <span id="ticket-num">${watch.capacity-watch.tickets_sold}remaining tickets</span>
              </div>
            </div>
            <div class="extra content">
              <button id="buy-ticket" class="ui orange button" onclick="buyTicket(-1)">
                Buy Ticket
              </button>
            </div>
            </div>
        
            `
            
        })
    })

}

function viewPoster(data){
    const live = document.querySelector('#live')
    const cont = document.createElement('div')
   const image = document.querySelectorAll(".photos")
   image.forEach(posters =>{
    posters.addEventListener('click',(event)=>{
      const Acquiredfilm = data.find((element)=>element.id === event.target.id)
      cont.innerHTML =`
      <img src=${Acquiredfilm.poster}>`
      live.appendChild(cont)

    })
   })
  }
   function buyTicket(buy){
    const grey = document.getElementById("buy-ticket")
    const number = document.getElementById("ticket-num")
    const newNumber= parseInt(number.innerHTML)
    number.innerHTML=newNumber
    if(newNumber> 1){
        number.innerHTML = newNumber + buy + 'remaining tickets'
    }
    else{
        number.textContent='sold out'
        grey.disabled = true
    }

   }


  

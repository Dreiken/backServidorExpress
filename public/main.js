const socket = io()

/* No sé porque cuando entro a la pagina me submitea el chat-input 3 veces porque si, solo
var form = document.getElementById("chat-input");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
*/

function postProduct(event) {
    const title = document.getElementById("title").value  
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value
    const data = {title: title, price: price, thumbnail: thumbnail}
    socket.emit("postingProduct", data)
}

function postMessage(event) {
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value
    const time = new Date()
    const data = {email: email, message: message, time: time}
    socket.emit("postingMessage", data)
    
}

function renderTable(data){
    const html = data.map(
        (product) => `<tr>
                        <td>${product.title}</td>
                        <td>${product.price}</td>
                        <td><img src=${product.thumbnail}></td>
                        <td>${product.id}</td>
                    </tr>`
        ).join("");
    
    document.getElementById("newProducts").innerHTML = html
}

function renderMessages(data){
    const html = data.map(
        (msg) => `<div class="message">
                        <p><span class="chat-email">{${msg.email}}</span>
                            <span class="chat-time">{${msg.time}} : </span>
                            <span class="chat-message">${msg.message}</span>
                        </p>
                </div>`
        ).join("");
    
    document.getElementById("chat-messages").innerHTML = html
}

socket.on("table", (data) =>{
    try {
        renderTable(data)
    }
    catch(error){
        console.error(error)
    }
})

socket.on("messages", (data) => {
    try {
        renderMessages(data)
    }
    catch(error){
        console.error(error)
    }
})

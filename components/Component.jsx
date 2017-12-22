//Tutorial: Renderizado del Lado Servidor con Express
//https://www.youtube.com/watch?v=RXoEgv1zCAw 

const React = require("react")

class App extends React.Component{

    handle_click(){
        //este click no se ejecutara pq habria que enviarle el bundle.js para que le llegue el js que debe llamar
        console.log("CLICK")
    }

    render(){
        return(
            <div>
                <h1>Hola Mundo con React y Babel</h1>
                <p>Some text</p>
                <button onClick={this.handle_click}>Click me</button>
            </div>
        )
    }//render
}//App

module.exports = App;
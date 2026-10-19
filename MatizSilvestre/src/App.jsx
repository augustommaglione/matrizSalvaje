import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>Pymes 2026</h1>
      <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
      <p>
        Backend: NodeJs, Express, WebApiRest, Swagger, Sequelize, SQLite y JavaScript.
      </p>
      <p>
        Frontend: Single Page Application, HTML, CSS, Bootstrap, NodeJs,
        JavaScript y React.
      </p>
      <button className="btn btn-lg btn-primary">
        <i className="fa fa-search"> </i>
        Ver Categorias
      </button>
    </div>

    </>
  )
}

export default App

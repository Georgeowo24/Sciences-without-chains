//Importar express js
const express = require('express');
//Inicializar express
const app = express();
//Definir puerto de escucha
const port = 8080;

//Obtener request
app.get('',(req,res)=>{
    res.json({message: "Datos desde el backend"});
})

//Escuchar puerto
app.listen(port,()=>{
    console.log(`EL servidor backend esta escuchando el puerto ${port}`);
})
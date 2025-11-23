const express=require('express')
const mod_fs = require('fs')
const app = express()
const puerto = 8080

app.use(express.static(__dirname))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) =>{
    res.sendFile(__dirname +"/Positions.html")
})

app.post("/datosform", (req, res) =>{
    let datos_html = false
    try{
        datos_html = mod_fs.readFileSync("./datos.html", {encoding: 'utf8', flag: 'r'})
        datos_html = datos_html.replace("%name", req.body.name)
        datos_html = datos_html.replace("%email", req.body.email)
    } catch (error){
        res.status(200).send("Archivo no encontrado" + error)
    }

    return res.send(datos_html)
})

app.listen(puerto, ()=>{
    console.log("servidor iniciado");
})

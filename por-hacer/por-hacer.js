const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) reject(err);
        console.log('El archivo ha sido creado!');
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const actualizar = (desc, bool) => {
    cargarDB();

    let indextarea = listadoPorHacer.findIndex(tarea => tarea.descripcion === desc);

    if (indextarea > -1) {
        listadoPorHacer[indextarea].completado = bool;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (desc) => {
    cargarDB();
    let listadoFiltrado = listadoPorHacer.filter(tarea => tarea.descripcion != desc);
    if (listadoFiltrado.length === listadoPorHacer.length) {
        return false;
    } else {
        guardarDB();
        return true;
    }
}


const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

module.exports = { crear, getListado, actualizar, borrar }
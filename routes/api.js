const express = require('express');
const { Pool, Client } = require('pg');
//const jwt = require('jsonwebtoken');
const router = express.Router();

//var bcrypt = require('bcryptjs');
//var VerifyToken = require('../auth/VerifyToken');
var config = require('../config');


/**
 * Create a regimen entity in DB Postgresql into Table m_regimen
 */
router.post('/regimen', (req, res) => {

    const sqlStr = "INSERT INTO public.m_regimen (nombre, usuario_crea) " +
        "VALUES ($1, $2) RETURNING *";
    const valueSql = [req.body.nombre, req.body.usuario_crea];

    var client = null;

    if (config.enviroment === "local_dev") {
        client = new Client({
            host: process.env.POSTGRESQL_HOST || config.postgres.server,
            user: process.env.POSTGRESQL_USER || config.postgres.user,
            database: process.env.POSTGRESQL_DB || config.postgres.database,
            password: process.env.POSTGRESQL_PASS || config.postgres.pass,
            port: process.env.POSTGRESQL_PORT || config.postgres.port
        });
    } else if (config.enviroment === "dev") {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_dev);
    } else {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_pro);
    }



    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });

    /// Call method query for execute Sql
    client.query(sqlStr, valueSql, (err, result) => {

        if (err) {
            console.log(err);
            res.status(200).send({
                code: 200,
                message: "NOK",
                detailmessage: "Error al Insertar objeto : " + err.detail
            });
        } else {
            res.status(200).send({
                code: 200,
                message: "OK",
                detailmessage: "Objeto Insertado correctamente",
                objeto: result.rows[0]
            });
        }
        client.end();
    });

});


/**
 * Retorna todos los regimen del sistema
 */
router.get('/regimen', (req, res) => {

    var client = null;
    if (config.enviroment === "local_dev") {
        client = new Client({
            host: process.env.POSTGRESQL_HOST || config.postgres.server,
            user: process.env.POSTGRESQL_USER || config.postgres.user,
            database: process.env.POSTGRESQL_DB || config.postgres.database,
            password: process.env.POSTGRESQL_PASS || config.postgres.pass,
            port: process.env.POSTGRESQL_PORT || config.postgres.port
        });
    } else if (config.enviroment === "dev") {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_dev);
    } else {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_pro);
    }

    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });
    client.query('SELECT * FROM public.m_regimen', (err, result) => {

        if (err) {
            console.log(err);
            res.status(200).send({
                code: 200,
                message: "NOK",
                detailmessage: "Error: " + err.detail
            });
        }
        res.status(200).send({
            code: 200,
            message: "OK",
            detailmessage: "",
            objeto: result.rows
        });
        client.end();
    });
});

/**
 * Retorn a regimen of system
 */
router.get('/regimen/:id', (req, res) => {

    const sqlStr = "SELECT * FROM public.m_regimen WHERE id = $1";

    const valueSql = [req.params.id];
    var client = null;
    if (config.enviroment === "local_dev") {
        client = new Client({
            host: process.env.POSTGRESQL_HOST || config.postgres.server,
            user: process.env.POSTGRESQL_USER || config.postgres.user,
            database: process.env.POSTGRESQL_DB || config.postgres.database,
            password: process.env.POSTGRESQL_PASS || config.postgres.pass,
            port: process.env.POSTGRESQL_PORT || config.postgres.port
        });
    } else if (config.enviroment === "dev") {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_dev);
    } else {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_pro);
    }
    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });
    client.query(sqlStr, valueSql, (err, result) => {

        if (err) {
            console.log(err);
            res.status(200).send({
                code: 200,
                message: "NOK",
                detailmessage: "Error: " + err.detail
            });
        }
        res.status(200).send({
            code: 200,
            message: "OK",
            detailmessage: "",
            objeto: result.rows
        });
        client.end();
    });
});


router.put('/regimen/:id', (req, res) => {
    const sqlStr = "UPDATE public.m_eps SET  nombre=$1, usuario_mod=$2, fecha_mod=NOW() WHERE id=$3 ";
    const valueSql = [        
        req.body.nombre,        
        req.body.usuario_mod,
        req.params.id];

    var client = null;
    if (config.enviroment === "local_dev") {
        client = new Client({
            host: process.env.POSTGRESQL_HOST || config.postgres.server,
            user: process.env.POSTGRESQL_USER || config.postgres.user,
            database: process.env.POSTGRESQL_DB || config.postgres.database,
            password: process.env.POSTGRESQL_PASS || config.postgres.pass,
            port: process.env.POSTGRESQL_PORT || config.postgres.port
        });
    } else if (config.enviroment === "dev") {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_dev);
    } else {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_pro);
    }

    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });
    client.query(sqlStr, valueSql, (err, result) => {

        if (err) {
            console.log(err);
            res.status(200).send({
                code: 200,
                message: "NOK",
                detailmessage: "Error al Insertar objeto : " + err.detail
            });
        } else {
            res.status(200).send({
                code: 200,
                message: "OK",
                detailmessage: "Objeto Actualizado correctamente",
                objeto: result.rows[0]
            });
        }

        client.end();
    });
});


router.delete('/regimen/:id', (req, res) => {
    const sqlStr = "UPDATE public.m_regimen SET estado=false,usuario_mod=$1, fecha_mod=NOW() WHERE id=$2";
    const valueSql = [req.body.usuario_mod, req.params.id];

    var client = null;
    if (config.enviroment === "local_dev") {
        client = new Client({
            host: process.env.POSTGRESQL_HOST || config.postgres.server,
            user: process.env.POSTGRESQL_USER || config.postgres.user,
            database: process.env.POSTGRESQL_DB || config.postgres.database,
            password: process.env.POSTGRESQL_PASS || config.postgres.pass,
            port: process.env.POSTGRESQL_PORT || config.postgres.port
        });
    } else if (config.enviroment === "dev") {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_dev);
    } else {
        client = new Client(process.env.POSTGRESQL_CNX || config.postgresql_pro);
    }
    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });
    client.query(sqlStr, valueSql, (err, result) => {

        if (err) {
            console.log(err);
            res.status(200).send({
                code: 200,
                message: "NOK",
                detailmessage: "Error al desactivar objeto : " + err.detail
            });
        } else {
            res.status(200).send({
                code: 200,
                message: "OK",
                detailmessage: "Regimen desactivado correctamente",
                objeto: result.rows[0]
            });
        }

        client.end();
    });
});


module.exports = router;
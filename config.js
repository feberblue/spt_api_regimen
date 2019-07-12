module.exports = {
    "enviroment": "local_dev",
    "jwt_secure": {
        "secret": "",
        "expiredTime": 900
    },
    "headers": {
        "origin_client": "*",
        "allow_method": "GET, POST, OPTIONS, PUT, DELETE",
        "allow_headers": "Authorization, Content-Type, Access, Access-Control-Allow-Methods, Access, Access-Control-Allow-Methods, X-API-KEY, Origin, X-Requested-With"
    },
    "postgres": {
        "port": 5432,
        "server": "localhost",
        "database": "postgres",
        "user": "",
        "pass": ""
    },
    "postgresql_pro": "",
    "postgresql_dev": "",
    "port_api": 41000,
	"name_app": "API Regimen"
}

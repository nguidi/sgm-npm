#!/usr/bin/env node

/*
	Cargamos Dependencias
*/

var	Optimist
=	require('optimist')
		.alias('h','help')
		.alias('v','version')
,	argv
=	Optimist
		.argv
,	_
=	require('lodash')
,	sgm
=	require('../lib')
,	path
=	require('path')


sgm.generate
=	require('./generate.js')(sgm)
sgm.new
=	require('./new.js')(sgm)
var	start
=	require('./start.js')(sgm)

/*
	Transformamos los argumentos de entrada en Strings
*/

if	(argv.h)
{
	process.exit(1)
}

if	(argv.v)
{
	console.log("Version "+sgm.version)
	process.exit(1)
}

argv._
=	_.map(
		argv._
	,	function(arg)
		{
			return arg + '';
		}
	)


/*
	Parseamos los argumentos de entrada
*/

var	action
=	argv._[0]
,	name
=	argv._[1]

if	(sgm.util.isValidArgument(action))
{
	sgm.log.info("Corriendo <<"+action+":"+name+">>...")
	if	(_.isEqual(action,'generate') && sgm.util.isValidDirectory())
	{
		if	(_.isEmpty(name))
		{
			sgm.log.error("Por favor proporsione un nombre como tercer argumento...")
			process.exit(1)
		}
		else
		{
			sgm.log.info("Generando un Modelo con el nombre <<"+name+">>")
			sgm.generate.model(name)
			sgm.log.info("Modelo Generado")
			sgm.log.info("Generando un Control con el nombre <<"+name+">>")
			sgm.generate.control(name)
			sgm.log.info("Control Generado")
			sgm.log.info("Generando Rutas con el nombre <<"+name+">>")
			sgm.generate.route(name)
			sgm.log.info("Rutas Generadas")
		}
	}
	else
	if	(_.isEqual(action,'new'))
	{
		sgm.log.info("Creando el la nueva aplicacion")
		sgm.new(name)
	}
	else
	if	(_.isEqual(action,'start'))
	{
		sgm.log.info("Iniciando aplicacion...")
		start()
	}	
}
else
{
	sgm.log.error("Comando <<"+action+">> desconocido...")
	process.exit(1)
}
var	express
=	require('express')
,	_
=	require('lodash')
,	load
=	require('include-all')
,	config
=	require('../config')
,	util
=	require('../util')
,	Log
=	require('log-color')
,	logger
=	new Log(
		{
			level:	'debug'
		,	color:	true
		}
	)

module.exports = SGM;

function SGM ()
{
	this.config
	=	config(this)

	this.util
	=	util(this)

	this.log
	=	logger

	this.version
	=	this.config.package.version

	this.start
	=	function ()
		{
			var	sgm
			=	this

			sgm.log.info("Iniciando "+sgm.config.appName)
			
			var	expressApp
			=	express()

			_.extend(
				sgm
			,	{
					model:	require('../models')(sgm)
				,	control:require('../controls')(sgm)
				,	route:	require('../routes')(sgm)
				}
			)
			
			sgm.log.info("Cargando Modelos")

			sgm.Models
			=	_.map(
					load(
						{
							dirname:	sgm.config.appPath+'/models'
						,	filter:		/^(.+)\.(js)$/
						,	excludeDirs:/^\.(git|svn)$/
						}
					)
				,	function(model,model_name)
					{
						return	new sgm.model(model,model_name)
					}
				)

			console.log(sgm.Models)

			sgm.log.info("Cargando Controladores")

			sgm.Controls
			=	_.map(
					load(
						{
							dirname:	sgm.config.appPath+'/controls'
						,	filter:		/^(.+)\.(js)$/
						,	excludeDirs:/^\.(git|svn)$/
						}
					)
				,	function(control,control_name)
					{
						return	new sgm.control(control,control_name)
					}
				)

			console.log(sgm.Controls)

			sgm.log.info("Definiendo las Rutas")
			
			sgm.Routes
			=	_.map(
					load(
						{
							dirname:	sgm.config.appPath+'/routes'
						,	filter:		/^(.+)\.(js)$/
						,	excludeDirs:/^\.(git|svn)$/
						}
					)
				,	function(route,route_name)
					{
						return	new sgm.route(route,route_name)
					}
				)	

			console.log(sgm.Routes)
			// sgm
			// 	.load(sgm.config.appPath+'/models')
			// 	.then(sgm.config.appPath+'/controls')
			// 	.then(sgm.config.appPath+'/routes')
			// 	.into(expressApp)

		}
}
module.exports = function(sgm) {

	var	_
	=	require('lodash')
	,	fs
	=	require('fs-extra')
	,	path
	=	require('path')
	,	fsExist
	=	fs.existsSync || path.existsSync


	return	function createApp(app_name)
			{
				var	app_path
				=	path.join(sgm.config.appPath,app_name)
				,	app_real_name
				=	_.last(app_name.split('/'))
				,	app_exist
				=	fsExist(app_path)

				sgm.log.debug("Generando la nueva aplicacion sgm en +"+app_path+"...")

				if	(!app_exist)
				{
					sgm.log.debug("Generando directorio de la aplicacion")
					fs.mkdirSync(app_path)
				}

				sgm.log.debug("Generando archivos de la nueva aplicacion")

				fs
					.copy(
						sgm.config.path + '/bin/boilerplates/scaffolding'
					,	app_path
					,	function(err)
						{
							if	(err)
							{
								sgm.log.error("Ocurrio un error al copiar los archivos. Verifique sus Permisos...")
								process.exit(1)
							}
						}
					)

				sgm.log.debug("Generando package.json de la nueva aplicacion")
				fs
					.writeFileSync(
						app_path + '/package.json'
					,	JSON.stringify(
							{
								name: app_real_name
							,	'private': true
							,	version: '0.0.0'
							,	description: 'Una aplicacion sgm'
							,	dependencies:
								{
									sgm			: sgm.version
								}
							,	scripts:
								{
									start: 'node app.js'
								,	debug: 'node debug app.js'
								}
							,	main: 'app.js'
							,	repository: ''
							,	author: ''
							,	license: ''
							}
						,	null
						,	4
						)
					)
			}
}
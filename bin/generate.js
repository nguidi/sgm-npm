module.exports = function (sgm) {

	var _
	=	require('lodash')
	,	fs
	=	require('fs-extra')
	,	path
	=	require('path')
	,	fsExist
	=	fs.existsSync || path.existsSync
	,	ejs
	=	require('ejs')
	_.str
	=	require('underscore.string')

	var	SGM_Genarate
	=	function()
		{

			this.control
			=	function(name)
				{
					var controlPath
					=	sgm.config.appPath + '/controls/' + _.str.capitalize(name) + '.js'

					if	(fsExist(controlPath))
					{
						sgm.log.error('Ya existe un Control con el nombre '+_.str.capitalize(name))
						process.exit(1);
					}

					return generate(
								{
									boilerplate:	'control'
								,	path:			controlPath
								,	name:			_.str.capitalize(name)
								}
							)
				}

			this.model
			=	function(name)
				{
					var modelPath
					=	sgm.config.appPath + '/models/' + _.str.capitalize(name) + '.js'

					if	(fsExist(modelPath))
					{
						sgm.log.error('Ya existe un Modelo con el nombre '+_.str.capitalize(name))
						process.exit(1);
					}

					return	generate(
								{
									boilerplate:	'model'
								,	path:			modelPath
								,	name:			_.str.capitalize(name)
								}
							)
				}

			this.route
			=	function(name)
				{
					var routePath
					=	path.join(sgm.config.appPath + '/routes/' + _.str.capitalize(name) + '.js')

					if	(fsExist(routePath))
					{
						sgm.log.error('Ya existe un Ruta con el nombre '+_.str.capitalize(name))
						process.exit(1);
					}

					return	generate(
								{
									boilerplate:	'route'
								,	path:			routePath
								,	name:			_.str.capitalize(name)
								}
							)
				}

			var generate
			=	function(options) 
				{
					sgm.log.info('Generando ' + options.name + '.' + options.boilerplate + '...')
					
					var	template_path
					=	fs.readFileSync(path.join(sgm.config.path + '/bin/boilerplates/templates/' + options.boilerplate + '.ejs'), 'utf8')
					,	template
					=	ejs.render(template_path, options);

					if	(fs.createFileSync(options.path))
					{
						sgm.log.error('Imposible crear el archivo, ' + options.path + '!');
						process.exit(1);
					}
					
					fs.writeFileSync(options.path, template);
				}
		}

	return	new SGM_Genarate()

};

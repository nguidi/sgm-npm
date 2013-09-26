module.exports
=	function (sgm)
	{

		/**
		 * 	Dependencias
		 */

		var	path
		=	require('path')
		,	_
		=	require('lodash')


		/** 
		 *	Configuracion Global de sgm
		 */

		var Defaults
		=	function()
			{
				//	Directorio de sgm
				this.path
				=	path.join(__dirname,'../..')
				
				//	Directorio de la APP
				this.appPath
				=	process.cwd()
				
				//	Nombre de la APP
				this.appName
				=	_.last(this.appPath.split('/'))
				
				//	Argumentos permitidos
				this.arguments
				=	['new','generate','start']			
			}

		return	new Defaults()
	}
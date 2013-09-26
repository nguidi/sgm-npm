module.exports
=	function(sgm)
	{

		/**
		 * 	Dependencias.
		 */

		var	fs
		=	require('fs')
		,	path
		=	require('path')

		/**
		 * 	Lectura y Parseo de package.json
		 */

		var	ParsePackage
		=	function()
			{
				var packagePath
				=	path.join(__dirname,'/../../package.json')
				,	json
				=	fs.readFileSync(packagePath, 'utf-8')

				return JSON.parse(json);
			}

		return	ParsePackage()
}
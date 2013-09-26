module.exports
=	function(sgm)
	{
		var _
		=	require('lodash')
		,	fs
		=	require('fs-extra')
		,	path
		=	require('path')
		,	fsExist
		=	fs.existsSync || path.existsSync

		return	function start()
				{
					var	package_path
					=	path.join(sgm.config.appPath, '/package.json')
					,	packageJSON
					
					if	(fsExist(package_path))
						packageJSON
						=	JSON.parse(fs.readFileSync(package_path, 'utf-8'))
					else
					{
						sgm.log.error("El directorio actual no contiene un package.json. Esta seguro de que es una aplicacion sgm?")
						process.exit(1)
					}

					if	(!(packageJSON.dependencies && packageJSON.dependencies.sgm))
					{
						sgm.log.error("El package.json del directorio no contiene a sgm como dependencia. Esta seguro de que es una aplicacion sgm?")
						process.exit(1)
					}

					var	sgm_dependency_path
					=	path.join(sgm.config.appPath,'/node_modules/sgm')

					if	(!fsExist(sgm_dependency_path))
					{
						sgm.log.error("El directorio actual no contiene a sgm como dependencia. Esta seguro de que es una aplicacion sgm?")
						process.exit(1)
					}

					sgm.start()
				}
}
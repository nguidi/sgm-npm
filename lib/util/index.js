module.exports
=	function(sgm)
	{
		/**
		 *	Dependencias.
		 */

		var _
		=	require('lodash')
		,	load
		=	require('include-all')
		
		var	Utilities
		=	function()
			{
				/**
				 *	Verifica si el argumento ingresado es valido.
				 */

				this.isValidArgument
				=	function(argument)
					{
						return	_.contains(sgm.config.arguments,argument)
					}

				/**
				 *	Verifica si el Directorio es un Directorio sgm valido. (TODO)
				 */

				this.isValidDirectory
				=	function()
					{
						return	true
					}
			}
		
		return	new Utilities()
	}
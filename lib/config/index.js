module.exports
=	function(sgm)
	{

		/**
		 *	Dependencias.
		 */

		var	_
		=	require('lodash')

		var	Config
		=	function()
			{

				/**
				 * Configuracion Base de la APP
				 *
				 */ 

				_.extend(
					this
				,	require('./defaults')(sgm)
				)

				/**
				 * Package.json
				 *
				 */ 

				this.package
				=	require('./package')(sgm);

			}

		return new Config()

}
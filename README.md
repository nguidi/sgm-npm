#	Estructura de la Aplicacion

	APP_NAME/
	|	models/
	|	|	personas.js
	|	controls/
	|	|	personas.js
	|	routes/
	|	|	personas.js
	|	tests/
	|	|	personas.js
	|	node_modules/
	|	app.js


#	Comandos del a APP

##	Generadores
	
	|	sgm new APP_NAME	crea la estructura de la app en la carpeta APP_NAME, si no existe la crea, si existe la usa como base
	|	sgm	generate NAME	crea un Model, Controller, Routes y Test con el nombre NAME dentro de las carpetas correspondiente. si existe te PUTEA
	
##	Debug y Start

	|	sgm start			Inicia la APP en modo desarrollo (Como app)
	|	sgm	start -t		Corre los Tests de la APP
	|	sgm start -p		Inicia la APP en modo Produccion (Como un Servicio)
	|	sgm stop			Detiene la APP en modo Produccion


#	Estructura del Controller
	{
		'findAll': 					Adapter.FindAll
	,	'findOne': 					Adapter.FindOne
	,	'count':					Adapter.Count
	,	'describe':					Adapter.Describe
	,	'update':					Adapter.Update
	,	'create':					Adapter.Create
	,	'filter':					Adapter.FindAll
	,	'find':						Adapter.FindOne
	,	'delete': 					Adapter.Delete
	,	'resolveAssoc':				Adapter.FindAll | Adapter.FindOne (Depende del Assoc)
	,	'countAssoc':				Adapter.Count
	,	'describeAssoc':			Adapter.Describe
	,	'filterAssoc':				Adapter.Filter (Solo ocurre si el assoc es has-many, has-many:through o has-and-belongs-to-many)
	,	'createAssoc':				Adapter.Create
	,	'deleteAssoc': 				Adapter.Delete
	}

#	Estructura Routes
	{
	//	Rutas del Modelo						Accion en el Control del Modelo
		'GET 	/personas':						'findAll'
	,	'GET 	/personas/:id':					'findOne'
	,	'GET 	/personas/count':				'count'
	,	'GET 	/personas/describe':			'describe'
	,	'PUT 	/personas/:id':					'update'
	,	'PUT 	/personas':						'create'
	,	'POST 	/personas/filter':				'filter'
	,	'POST 	/personas/find':				'find'
	,	'DELETE	/personas/:id':					'delete'

	//	Rutas de sus Assocs (Si tiene)			Accion en el Control del Modelo
	,	'GET	/personas/:id/:assoc':			'resolveAssoc'
	,	'GET	/personas/:id/:assoc/count':	'countAssoc'
	,	'GET	/personas/:id/:assoc/describe':	'describeAssoc'
	,	'POST	/personas/:id/:assoc':			'filterAssoc'
	,	'PUT	/personas/:id/:assoc':			'createAssoc'
	,	'DELETE	/personas/:id/:assoc':			'deleteAssoc'
	}

#	Estructura Modelo
	{
		table_name: 'personas'
	,	adapter: 'mongo'
	,	content_type: 'hal'
	,	beforeValidate: function() {}
	,	beforeCreate: function() {}
	,	afterCreate: function() {}
	,	beforeUpdate: function() {}
	,	afterUpdate: function() {}
	,	beforeDestroy: function() {}
	,	afterDestroy: function() {}
	,	toJSON: function() {}
	,	toHAL: function() {}
	,	attributes:
		{
			//	Opcional
			id:
			{
				type: 'Primary Key'
			,	unique: true
			}
		,	nombre: 'String'
			//	No es Opcional
		,	Madre:
			{
				type: 'Foreing Key'
			,	model: 'Personas'
			}
		,	Padre:
			{
				type: 'Foreing Key'
			,	model: 'Personas'
			}
		,	Hijos:
			{
				type: 'Foreing Key'
			,	model: 'Personas'
			}
		}

	,	associations:
		{
			Madre:
			{
				type: 'belongs-to'
			,	model: 'Personas'		//	Modelo con que se relaciona
			}
		,	Padre:
			{
				type: 'belongs-to'
			,	model: 'Personas'		//	Modelo con que se relaciona
			}
		,	Hijos:
			{
				type: 'has-many'
			,	model: 'Personas'		//	Modelo con que se relaciona
			}
		,	Nietos:
			{
				type: 'has-many:through'
			,	embedded: 'partial'
			,	model: 'Personas'		//	Modelo con que se relaciona
			,	through: 'Hijos'		//	Assoc de la Instancia
			,	association: 'Hijos'	//	Assoc de la/s Instancias del atributo Through de arriba
			}
		}
	}

#	Otras Consideraciones

##	TipoEmbedded (String)
	-	none	>	no sera embebido
	-	partial	>	sera embebido pero sus embebidos no tendran embebidos
	-	full	>	sera embebido pero sus embebidos definiran si tendran o no embebidos

##	TipoCollection (String[type] | Object)
	-	type:	Tipo de Collection (String)
				Valor por defecto: list
				Posibles Valores: list - pageable - scrollable
	-	ipp:	LIMIT (Integer)
				Limite de items por pagina
				Valor por defecto: 10
				Si 0 entonces no tiene limites
	-	page:	OFFSET (Integer)
				Pagina de inicio
				Valor por defecto: 1
				Si 0 entonces: 1
	-	sortBy	Tipo de Orden
				Valor por defecto: Atributo ID, Criterio menor a mayor (<)
				atribute: Atributo del Modelo	(String)
				criteria: Criterio de Comparacion	(String)
					-	<	Menor a Mayor
					-	>	Mayor a Menor

#	Otras propiedades de las Asociaciones
	
##	embedded:	
	-	TipoEmbedded

##	collection: 
	-	String (TipoCollection | Toma Valores por defecto)
	-	Object (Detalles TipoCollection)
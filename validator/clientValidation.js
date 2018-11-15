module.exports = {
   name: [
   	['required', 'El campo es name requerido']
   ],
	 lastname: [
	 	['required', 'El campo es lastname requerido']
	 ],
	 email: [
 			['regexp', /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 'input a right mail please'],
 		],
	 // dni: [
	 // 	['required', 'El campo es dni requerido']
	 // ],
	nickname: [
		['required', 'El campo es nickname requerido'],
		['minLength', 6, 'El campo es demasiado corto'],
        ['maxLength', 11, 'EL campo es demasiado largo']
	],
	password: [
		['required', 'El campo es password requerido'],
		['minLength', 6, 'El campo es demasiado corto'],
        ['maxLength', 11, 'EL campo es demasiado largo']
	]
 	//type_employee: [
 	//	['required', 'El campo es type_employee requerido']
 	//],
 	//id_status: [
 	//	['required', 'El campo es id_status requerido']
 	//],
 	//avatar: [
 	//	['required', 'El campo es avatar requerido']
 	//]

};
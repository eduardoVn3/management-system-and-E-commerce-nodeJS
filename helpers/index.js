var response = require('./response')
var configModels = require('.././config/models')

module.exports = {
  showAll: function (collection,code = 200,request = null){
    collection = response.pagination(collection,request)
    return response.success(collection,code)
  },
  showOne: function (Obj,code){
    return response.success(Obj,code)
  },
  // concatIdxValue: function (model,request){
  //   // ["A","B"] ES UN  OBJECTO
  //   if (typeof model === "object")    {
  //     console.log('entro como object');
  //     var modelAttrs = model;
  //     var newModel = response.showNotHiddenArray(modelAttrs,configModels);
  //   }else{
  //     console.log('entro como funcion');
  //     // ENTONCES ES UNA FUNCIÓN
  //     var modelAttrs = model.attributes;
  //     var newModel = response.showNotHidden(modelAttrs,configModels);
  //   }
  //   for (let prop in newModel) {
  //       for (let idx in request) {
  //           if (prop == idx) {
  //             newModel[prop] = request[idx]
  //           }
  //       }
  //   }
  //   return newModel;
  // },
  match_value_in_idx(obj,obj_merge){
    // SOLO IGUALA EL VALOR AL INDICE DEL PRIMER OBJ
    if (obj == null || obj_merge == null) {
      return obj;
    }
    for (let prop in obj) {
        for (let prop_obj_merge in obj_merge) {
            if (prop == prop_obj_merge) {
              obj[prop] = obj_merge[prop_obj_merge]
            }
        }
    }
    return obj;
  },
  matchObjs(obj_one,obj_two){
    // EL NUEVO OBJ VA A TENER LOS VALORES DEL OBJ_TWO
    // CONSERVANDO TODO EL OBJECTO
    // console.log('obj_one',obj_one);
    // console.log('obj_two',obj_two);
    if (obj_one == null || obj_two == null) {
      return obj;
    }
    var new_obj = {};
    for (let prop in obj_one) {
        for (let prop_obj_two in obj_two) {
            if (prop == prop_obj_two) {
              new_obj[prop] = obj_two[prop_obj_two]
            }
        }
    }
    return new_obj;
  },
  hiddenProperty(model,property){
    if (model == null || property == null) {
      return model;
    }
    var Obj = {}

    for (let prop in model) {
      var status = true
      for (let idxGoHidden in property) {
        if (prop == property[idxGoHidden]) {
          status = false
          break;
        }
      }
      if (status == true) {
        Obj[prop] = model[prop]
      }
    }
    return Obj;
  },
  newObjHiddenProperty(model,property){
    var Obj = {}

    for (let prop in model) {
      var status = true
      for (let idxGoHidden in property) {
        if (prop == property[idxGoHidden]) {
          status = false
          break;
        }
      }
      if (status == true) {
        Obj[prop] = null
      }
    }
    return Obj;
  },
  newObjHiddenProperty_2(model,property){
    var Obj = {}

    for (let prop in model) {
      var status = true
      if (property.indexOf(model[prop]) >= 0) {
        status = false
      }

      if (status == true) {
        Obj[model[prop]] = null
      }
    }
    return Obj;
  },
  cleanFieldsNulls(obj_one){

    if (obj_one == null) {
      return null;
    }
    var Obj = {}

    for (let prop in obj_one) {
      if (obj_one[prop] != null) {
        Obj[prop] = obj_one[prop]
      }
    }
    return Obj;
  }
  // showHidden:function(data,code){
  //   let newData = response.hidden(data)
  //   return response.success(newData,code)
  // }
};

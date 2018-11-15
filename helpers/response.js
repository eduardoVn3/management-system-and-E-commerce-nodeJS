module.exports = {
  success: function (value,code = 200){
    if (typeof value === 'object') {
      return {
        data: value,
        status: code
      }
    }
    return {
      success: [
        {
          msg: value
        }
      ],
      status: code
    }
  },
  error: function (message,code = 404){
    if (typeof message === 'object') {
      return {
        errors: message,
        status: code
      }
    }
    return {
      errors: [
        {
          errMsg: message
        }
      ],
      status: code
    }
  },
  showNotHidden: function(model,configModels){
    var Obj = []

    for (let prop in model) {
      var status = false
      for (let idxGoHidden in configModels.hidden) {
        if (prop == configModels.hidden[idxGoHidden]) {
          status = true
          break;
        }
      }
      if (status == false) {
        Obj[prop] = ''
      }
    }
    return Obj;
  },
  showNotHiddenArray: function(array,configModels){
    var Obj = []
    for (let prop in array) {
      var status = false
      for (let idxGoHidden in configModels.hidden) {
        if (array[prop] == configModels.hidden[idxGoHidden]) {
          status = true
          break;
        }
      }
      if (status == false) {
        Obj[array[prop]] = ''
      }
    }
    return Obj;
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
        Obj[prop] = ''
      }
    }
    return Obj;
  },
  pagination( collection, request ){
    if (request == null) {
      return collection;
    }else {
      if (request.hasOwnProperty('page')) {
        let numItems = 10;
        if (request.page <= 0) {
          return collection;
        }
        return collection.slice((request.page-1)*numItems, (request.page)*numItems);
      }
      return collection;
    }
  }
}

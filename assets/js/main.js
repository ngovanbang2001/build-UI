function Validator(options) {
    var formElement = document.querySelector(options.form);
    
    //Khai báo object để cho các rule vào
    selectoRules = {}
    function Validate(rule, inputElement, errorElement) {
        var errorMessage;
        var rules = selectoRules[rule.selector];
        //Lặp qua từng rule
        for (var i = 0; i < rules.length; i++) {

            switch (inputElement.type) {
                case 'checkbox':
                    var input = formElement.querySelector(rule.selector + ":checked");
                          errorMessage = rules[i](input ? input.value : '')
                        break;
                case 'radio':
                    var input = formElement.querySelector(rule.selector + ":checked");

                    errorMessage = rules[i](input ? input.value : '')
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
                    
                    } 
              if (errorMessage) break;
         
        }
        if (errorMessage !== undefined) {
            errorElement.innerText = errorMessage;
            inputElement.closest(options.formGroup).classList.add('invalid')
        }
        return !errorMessage
    }
    if (formElement) {
        formElement.onsubmit = function (e) {

            e.preventDefault();
            var isFormValid = true;
            console.log(selectoRules)
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector)
                var errorElement = inputElement.closest(options.formGroup).querySelector(options.formMessage);
              var isValid= Validate(rule, inputElement, errorElement);
                //Có lỗi trong validate nên isValid=true
              if(!isValid)
              {
                  //form lỗi 
                  isFormValid=false;
                 
              }
            })
            var inputEnable=formElement.querySelectorAll('input[name]')
                  
                    var formValue=Array.from(inputEnable).reduce((values,input)=>{
                    
                        switch (input.type) {
                            case 'checkbox':
                                if(!input.checked) return values;
                                if(Array.isArray(values[input.name]))
                               {
                                 values[input.name].push(input.value)
                               }
                               else{
                                values[input.name]=[input.value]
                               }    
                                break;
                            case 'radio':
                               if(input["checked"])
                               {
                                 values[input.name]=input.value
                               }
                                break;
                            case 'file':
                                values[input.name]=input.files;
                                break;
                            default:
                                      values[input.name]=input.value
                                }  
                                return values          
                    },{})
                  
            //nếu form đúng
            if(isFormValid)
            {
                if(typeof options.onSubmit === 'function')
                {
                    options.onSubmit(formValue)
                }
            }
            //form sai
            else{
                console.log("Có lỗi")
            }
           
           

        }
        options.rules.forEach((rule) => {

            //Kiểm tra có phải mảng không 
            //Nếu không thì gán rule vằng key 
            //Nếu có thì đây rule tiếp thành 1 mảng
            if (Array.isArray(selectoRules[rule.selector])) {
                selectoRules[rule.selector].push(rule.test)
            }
            else {
                selectoRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach((inputElement) => {
                var errorElement = inputElement.closest(options.formGroup).querySelector(options.formMessage)
                if (inputElement) {
                    inputElement.onblur = () => {
                        Validate(rule, inputElement, errorElement);
                    }
                    inputElement.oninput = function () {
                        if (rule.test(inputElement.value) === undefined) {
                            errorElement.innerText = "";
                            inputElement.closest(options.formGroup).classList.remove('invalid')
                        }
                    }
                }
            })

        })
    }
    hanldePassword(options,formElement) 
  
}

function hanldePassword(options,formElement) {
    var ischecked = formElement.querySelector(options.formCheckPass);
    var confirmPass = formElement.querySelector("#password_confirmation")
    var pass = formElement.querySelector("#password")
    ischecked.onchange = function () {

        if (ischecked.checked === true) {
            confirmPass.setAttribute("type", "text");
            pass.setAttribute("type", "text");
        }
        else {

            confirmPass.setAttribute("type", "password");
            pass.setAttribute("type", "password");
        }
    }
}
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            if (typeof value === 'string') {

                return value.trim() ? undefined : message || " Vui lòng nhập trường này";
            }
            return value ? undefined : message || " Vui lòng nhập trường này"

        }
    }
}
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) ? undefined : message || " Địa chỉ email không hợp lệ"
        }
    }
},
    Validator.isPassword = function (selector, minLength, message) {
        return {
            selector: selector,
            test: function (value) {
                return value && value.length >= minLength ? undefined : message || " Vui lòng nhập đủ " + minLength + " kí tự"
            }
        }
    }
Validator.isConfirmPasssword = function (selector, check, message) {
    return {
        selector: selector,
        test: function (value) {
            if (value === check()) return undefined
            else if (value !== check() && value.length > 0) return message || "Trường nhập không chính xác"
        }
    }
}


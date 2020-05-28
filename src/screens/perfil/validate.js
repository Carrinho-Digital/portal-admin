export default (values) => {
    let errors = {};

    if (!values.name || !values.name.trim()) {
        errors.name = 'Digite o nome do mercado!';
    }

    if (!values.document || !values.document.trim()) {
        errors.document = 'Digite o CNPJ!';
    }
    
    if (!values.phones || !values.phones.length) {
        errors.phones = {_error : 'Digite ao menos um telefone!'};
    }else{
        errors.phones = []
        values.phones.forEach((phone, index) => {
            if(!phone || phone.trim() == ""){
                errors.phones[index] = "O telefone está em branco!"
            }
        });
    }

    return errors;
}

// export function validatePhone(values){
//     debugger
//     let errors = null;

//     if(!values || !values.length){
//         errors = "meu pinto"
//     }
// }
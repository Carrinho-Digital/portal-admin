export default (values) => {
    let errors = {};
    
    if (values.promotionPerPrice) {
        if (values.discountInPrice <= 0) {
            errors.discountInPrice = 'Digite o valor de desconto!'
        }
    } else {
        if (values.discountInPercent <= 0) {
            errors.discountInPercent = 'Digite o percentual de desconto!'
        }
    }

    if (values.promotionPerProduct) {
        if (!values.product || !values.product._id) {
            errors.product = 'Digite o produto!';
        }
    } else {
        if (!values.tags || !values.tags.length) {
            errors.tags = 'Selecione pelo menos uma tag!';
        }
    }

    if (!values.undefinedTime) {
        if (!values.startDate) {
            errors.startDate = 'Selecione a data e hora de início!'
        }
        if (!values.endDate) {
            errors.endDate = 'Selecione a data e hora de fim!'
        }
    }

    return errors;
}
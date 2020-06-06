export default (values) => {
    let errors = {};
    
    if (!values.distanceInKm) {
        errors.distanceInKm = 'Digite a distância em Km!';
    }

    if (!values.price) {
        errors.price = 'Digite o preço!';
    }
    
    return errors;
}
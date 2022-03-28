const calculate = require('../utils/calculate');

const calculator = async (req, res, next) => {

    // console.log('this query', req.query.calc)

    let answer = '';

    try {

        const errorText = 'Invalid calc';
        if (req.query.calc !== undefined) {
            answer = calculate(req.query.calc)
            if ( !answer ) {
                throw errorText;
            }

            res.json({ data: answer }); 

        } else {
            throw errorText;
        }    

    } catch ( error ) {
        const err = new Error(error);
        err.status = 'Fail';
        err.statusCode = 401;
        next(err)
    }
}

module.exports = {
    calculator
}
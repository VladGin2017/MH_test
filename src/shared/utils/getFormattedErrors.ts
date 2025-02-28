import { Errors } from "../components/Validation/types/erros";


const formattedErrors = (errorsArr: {field: string, message: 'string'}[]): Errors[] => {
    return errorsArr.map((err) => ({
        key: err.field,
        err: err.message
        
    })) 

}

export default formattedErrors;
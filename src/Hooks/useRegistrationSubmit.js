import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const registerUrl = '/api/method/guidestar.api.npo_registration.make_initial_registration'

const submitFormData = async(formData)=>{
    const response = await axios.post(registerUrl , {args :formData})
    return response
}

export const useRegistrationSubmit = ()=>{
    return useMutation({
        mutationFn:submitFormData,
        onError: (error, variables, context) => {
            console.log(error, variables, context);
            
          },
    })
}


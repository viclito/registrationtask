import * as yup from "yup"

export const basicSchema  = yup.object({
    panNumber:yup.string().required("Please enter your Pan Number"),
    DarpanId:yup.string().required("Please enter your Darpan Id"),
    OrganaizationName:yup.string().required("Please enter your Organaization Name"),
    OrganaizationEmail:yup.string().required("Please enter your Organaization Email").email("Invalid email format"),
    ConfirmEmail:yup.string().oneOf([yup.ref("OrganaizationEmail")], "Email must match"),
    name:yup.string().required("Please enter your Name"),
    designation:yup.string().required("Please enter your designation"),
    place:yup.string().required("Please enter your Place"),
    consent:yup.string().required("Please select your Consent")
})
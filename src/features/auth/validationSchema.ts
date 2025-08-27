import * as Yup from "yup";

export const signUpSchema = Yup.object( {
    password: Yup.string()
        .required( "Password is required" )
        .min( 8, "At least 8 characters" )
        .matches( /[A-Z]/, "Needs an uppercase letter" )
        .matches( /[a-z]/, "Needs a lowercase letter" )
        .matches( /\d/, "Needs a number" ),
    // .matches(/[^A-Za-z0-9]/, "Needs a special character") // if you want
    confirmPassword: Yup.string()
        .oneOf( [Yup.ref( "password" )], "Passwords must match" )
        .required( "Please repeat the password" ),
} );
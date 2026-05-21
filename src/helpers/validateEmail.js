export const validateEmail = (email) =>{
    let roleNameToFind ;

    if(email.endsWith("@admin.com")){
        roleNameToFind = "admin"
    }else if (email.endsWith("@superadmin.com")){
        roleNameToFind = "superadmin"
    }else{
        roleNameToFind = "user"
    }

    return roleNameToFind;
}
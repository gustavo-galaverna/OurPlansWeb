import { redirect } from "react-router-dom";
import { isAuthenticated } from "../api/userService"

// const needsAuth = async () =>
// {
//     let userAuthenticated = await isAuthenticated();
//     if(!userAuthenticated)
//     {
//         redirect("/login")
//     }
    
//     return;
// }

// const forceNoAuth = async () =>
// {
//     let userAuthenticated = await isAuthenticated();
//     if(userAuthenticated)
//     {
//         redirect("/")
//     }

//     return;
// }



// export { needsAuth, forceNoAuth }
let test = (function() {
    let users = [];
    return {
        createUser: function(username, password, gender, activity){

            let exists = users.filter(user => user.username === username);

            if(username.length <4 || username.length >12 || exists.length >0){
                return false;
            }
            if(password.length <4 || password.length >12){
                return false;
            } if(gender !== "male" && gender !== "female"){
                return false;
            }
            if (activity !== "unactive" && activity !== "average" && activity !== "active"){
                return false;
            }
            let newUser = {username: username, password: password, gender: gender, activityLevel: activity};
            users.push(newUser);
            return true;
        },
        size: function(){
            return users.length;
        },
        addToUsers: function(username, password, gender, activity){
            let newUser ={username: username, password: password, gender: gender, activityLevel: activity};
            users.push(newUser)
        },
        signIn: function(username, password){
            let exists = users.filter(user =>(user.username === username));
            if(exists !== undefined)
            {
                console.log(exists[0])
                if(exists[0].password === password){
                    return true;
                }
            }
            return false;
        }

    }
}());
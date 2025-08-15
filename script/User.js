class User {
    constructor(){}

    Login(user){
        let username = user.username.val();
        let password = user.password.val();
        
        if(username == "" || password == ""){
            Swal.fire({
                title: 'Incomplete Form.',
                text: 'Please complete the login form.',
                icon: 'warning'
            })
        } else {
            $.ajax({
                url: "php/controllers/User/Login.php",
                method: "POST",
                data: {
                    username: username,
                    password: password,
                },
                success: function(response) {
    
                    console.log(response);

                    if(response.status == "incorrect"){
                        Swal.fire({
                            title: 'Incorrect Username or Password!',
                            text: 'Please check your username or password.',
                            icon: 'warning'
                        })

                        user.password.val("");
                    } else if(response.status == "inactive"){
                        Swal.fire({
                            title: 'The account is restricted!',
                            text: 'Ask the administrator to unrestrict your account',
                            icon: 'warning'
                        })
                    } else if(response.status == "success"){
                        Swal.fire({
                            title: 'Successfully Login!',
                            text: 'Proceed to Homepage!',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Proceed!',
                            timer: 2000,
                            willClose: () => {
                                window.location.href = "dashboard";
                            },
                        })
                    }
                },
                error: function(err){
                    console.log("Error:"+JSON.stringify(err));
                },
            });
        }
    }
}


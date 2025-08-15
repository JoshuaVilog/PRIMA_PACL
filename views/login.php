<!DOCTYPE html>
<html lang="en">
    <body id="loginBody" class="">
        <style>
            .parent {
                display: flex;
                justify-content: center; /* horizontal */
                align-items: center;     /* vertical */
                height: 100vh;           /* fill full height */
            }

            .child {
                width: 400px;
                /* padding: 20px; */
                /* background-color: #eee; */
            }
        </style>
        <div class="container parent">
            <div class="child">
                <div class="card">
                    <div class="card-body" style="width:100%">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="" style="background-color: white; padding: 30px; border-radius: 25px;">
                                    <div class="center">
                                        <img src="/<?php echo $pluginFolder; ?>/images/gallery/logo.png" id="imgLogo" class="img-fluid" alt="">
                                        <h3 class="" style="color:black">
                                            <span><?php echo $systemTitle; ?></span>
                                        </h3>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-user input-lg" id="txtUsername" placeholder="Enter Username">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control form-control-user input-lg" id="txtPassword" placeholder="Password">
                                    </div>
                                    <div class="form-group">
                                    </div>
                                    <button  class="btn btn-primary btn-user btn-block" id="btnLogin">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- JavaScript -->
        <script src="/<?php echo $rootFolder; ?>/script/User.js?v=<?php echo $generateRandomNumber; ?>"></script>
        
        <script>
            let user = new User();

            $("#btnLogin").click(function(){
                let txtUsername = $("#txtUsername");
                let txtPassword = $("#txtPassword");

                user.username = txtUsername;
                user.password = txtPassword;

                user.Login(user)
            });
        </script>
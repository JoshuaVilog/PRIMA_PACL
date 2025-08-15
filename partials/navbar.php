<div id="navbar" class="navbar navbar-default ace-save-state" style="background-color:#00008b; height:25px;">
    <div class="navbar-container ace-save-state" id="navbar-container">
        <button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
            <span class="sr-only">Toggle sidebar</span>

            <span class="icon-bar"></span>

            <span class="icon-bar"></span>

            <span class="icon-bar"></span>
        </button>

        <div class="navbar-header pull-left">
            <a href="dashboard" class="navbar-brand">
                <small>
                    <span id="span-brand-web"><?php echo $systemTitle; ?></span>
                    <span id="span-brand-mobile"><?php echo $systemNameShortcut; ?></span>
                </small>
            </a>
        </div>
        
        <div class="navbar-buttons navbar-header pull-right" role="navigation" >
            <ul class="nav ace-nav" >
                <li class="light-blue dropdown-modal">
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle" style="background-color:#00008b">
                        <span class="user-info">
                            <small>Welcome, <?php echo $_SESSION['USER_FULLNAME']; ?></small>
                            <span id="displayUserFullName"></span>
                        </span>

                        <i class="ace-icon fa fa-caret-down"></i>
                    </a>

                    <ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close" >
                        <li>
                            <a href="profile">
                                <i class="ace-icon fa fa-user"></i>
                                Profile
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="logout" id="btnLogout">
                                <i class="ace-icon fa fa-power-off"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
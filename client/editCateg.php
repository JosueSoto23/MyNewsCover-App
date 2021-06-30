<?php
session_start();

$user = $_SESSION['user'];

if($user == null){
  header("Location: index.php");
}
?>


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/register.css">
</head>

<body>
<nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->

            <div class="navbar-header ">
                <a class="navbar-brand" rel="home" href="#" title="Buy Sell Rent Everyting">
                    <img style="max-width:200px; margin-top: -30px;" src="img/logo.jpg">
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <form class="navbar-form navbar-right">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <?php echo $user['first_name'];?>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="logica/cerrarSesion.php">Logout</a>
                            <br>    
                            <a class="dropdown-item" href="crudCategories.php">Categories</a>
                        </div>
                    </div>
                </form>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>

    <?php
    require 'logica/conexion.php';
    $id = $_GET['id'];
    $conn = getConnection();
    $con = "SELECT * FROM categories WHERE id = '$id'";
    $query = mysqli_query($conn, $con);
    $array = mysqli_fetch_array($query);

    ?>
    <div class="container">
        <h1>News Source</h1>
        <form action="logica/log.php?id=<?php echo $array['id'] ?>" method="POST" class="form-group row" role="form">
            <div class="col-xs-6">
                <hr>
            </div>
            <br><br><br>
            <div class="col-xs-3">
                <input type="text" class="form-control" id="" name="Name" placeholder="Name" value="<?php echo $array['names'];?>">
            </div>
            <br><br><br>
            <div class="col-xs-6">
                <hr>
            </div>
            <br><br><br>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>

    <footer>
        <nav class="navbar navbar-default  navbar-fixed-bottom" role="navigation">
            <div class="container text-center">
                <div class="content-fooa">
                    <h4> <a href="">My Cover</a> | <a href="">About</a> | <a href="">Help</a></h4>
                </div>
                <p class="navbar-text col-md-12 col-sm-12 col-xs-12">&copy; My News Cover</p>
            </div>
        </nav>
    </footer>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
        </script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
        </script>
</body>

</html>
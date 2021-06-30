<?php
session_start();

$user = $_SESSION['user'];

if($user == null){
  header("Location: index.php");
}


require 'logica/sources.php';

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/register.css">
</head>

<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img class="ads" style="max-width:200px; margin-top: -10px;" src="img/logo.jpg">


        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

                <li class="nav-item dropdown">
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-right: 90px;">
                        <?php echo $user['first_name'];?>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="logica/cerrarSesion.php">Logout</a>
                        <a class="dropdown-item" href="dashboard.php">Dashboard</a>
                    </div>
                </div>
            </form>
        </div>
    </nav>
    <div class="container">
        <h1>News Sources</h1>
        <hr id="hr3">

        <table class="table table-responsive table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            <?php
                foreach ($query as $row){?>
                        <tr>
                            <td><?php echo ($row['nameN']);?></td>
                            <td><?php echo ($row['names']);?></td>
                            <td><a href="editnews.php?id=<?php echo $row['id'] ?>"><button type='button' class='btn btn-success'>Edit</button></a>  <a href="logica/eliminarNews.php?id=<?php echo $row['id'] ?>"><button type='button' class='btn btn-danger'>Delete</button></a></td>
                        </tr>
                    </tbody>
                    <?php
                }
                ?>
        </table>
        <form action="addnews.php">
        <button type="submit" class="btn btn-primary">Add New</button>
        </form>
    </div>
    <footer>
        <nav>
            <hr>
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
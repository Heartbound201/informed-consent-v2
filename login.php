<?php session_start(); /* Starts the session */

	/* Check Login form submitted */
	if(isset($_POST['Submit'])){
		/* Define username and associated password array */
		$logins = array('username1' => 'password1','username2' => 'password2');

		/* Check and assign submitted Username and Password to new variable */
		$Username = isset($_POST['Username']) ? $_POST['Username'] : '';
		$Password = isset($_POST['Password']) ? $_POST['Password'] : '';
		$Email = isset($_POST['Email']) ? $_POST['Email'] : '';

		/* Check Username and Password existence in defined array */
		if (isset($logins[$Username]) && $logins[$Username] == $Password){
			/* Success: Set session variables and redirect to Protected page  */
			$_SESSION['UserData']['Username']=$logins[$Username];
			$_SESSION['UserData']['Email']=$Email;
			header("location:index.php");
			exit;
		} else {
			/*Unsuccessful attempt: Set error message */
			// si potrebbe scrivere un errore specifico in base a campo uoto, password sbagliata, user inesistente ecc
			$msg="Errorr message";
		}
	}
?>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>LOGIN PAGE</title>
		<?php define("PREPATH", "");
    require_once(PREPATH."page_builder/_header.php") ?>

		<style type="text/css">

			.container{
				margin-bottom: 10%;
			}

			label{
				float: left;
			}

			.col-auto{
				margin: 5%;
				margin-bottom: 0;
			}

			#Submit{
				width: 120px;
			}

		</style>
  </head>

  <body>

		<div class="container">
		  <h1 class="display-4">Inserire le credenziali</h1>
			<form action="" method="post">
				<div class="form-group">

				<!-- alert messaggio errore credenziali -->
				<?php if(isset($msg)){?>
				<div class="col-auto alert alert-danger alert-dismissible fade show mt-3" role="alert">
					<strong><i class="fas fa-exclamation-triangle"></i>&emsp;Credenziali errate!&emsp;</strong>-&emsp;Riprovare
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<?php } ?>

					<div class="col-auto">
						<label for="username"><strong>Nome Utente <span style="color: red; font-size: 14px;">*</span></strong></label>
						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<i class="fas fa-user-md"></i>
								</div>
							</div>
							<!-- lascio scritto l'username nell'input text in caso di errore nelle credenziali-->
							<input type="text" class="form-control" value="<?php if(isset($Username)) echo $Username;?>"
							 name="Username" placeholder="Inserire nome utente">
						</div>
					</div>
					<div class="col-auto">
						<label for="password"><strong>Password <span style="color: red; font-size: 14px;">*</span></strong></label>
						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<i class="fas fa-key"></i>
								</div>
							</div>
							<input type="password" class="form-control" name="Password" placeholder="Inserire password">
						</div>
					</div>
					<div class="col-auto">
						<label for="email"><strong>Email</strong></label>
						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<i class="fas fa-envelope"></i>
								</div>
							</div>
							<input type="email" class="form-control" name="Email" value="<?php if(isset($Email)) echo $Email;?>" placeholder="Inserire mail per ricevere report finale">
						</div>
					</div>
				</div>

				<div class="col-auto mt-0" style="text-align: left;">
					<span style="color: red; font-size: 14px !important;">* Campi obbligatori</span>
				</div>

					<div class="col-auto" align="center">
	  				<button type="submit" class="btn btn-primary" id="Submit" name="Submit">
							Login <i class="fas fa-sign-in-alt"></i>
						</button>
					</div>
			</form>
		</div>

		<?php include PREPATH.'page_builder/_footer.php';?>

  </body>
</html>

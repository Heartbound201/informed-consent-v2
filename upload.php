<?php
  $target_dir = "uploads/";
  $target_name = $_FILES["fileToUpload"]["name"];
  $target_file = $target_dir.basename($_FILES["fileToUpload"]["name"]);

  $uploadOk = 1;

  // Check if file already exists
  // if (file_exists($target_file)) {
      // msg per non accettare un file gia caricato nella cartella upload
      // echo "Sorry, file already exists.";
      // $uploadOk = 0;
      // header('Location: http://127.0.0.1/stage/stage-alessandro-fumagalli/builder.php?redirectTo=' . $target_name);
  // }

  // Check if file already exists
  if (file_exists($target_file)) {
      echo "Sorry, your file $target_file exists. ";
      unlink($target_file);
      $uploadOk = 2;
    }

  // Check file size
  if ($_FILES["fileToUpload"]["size"] > 5000000) {
      echo "Sorry, your file is too large.";
      $uploadOk = 0;
  }

  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
      echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } else if ($uploadOk == 1 || $uploadOk == 2) {
      if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
          echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
          header('Location:builder.php?redirectTo=' . $target_name ."&education=" . $_POST['edu']);
      } else {
          echo "Sorry, there was an error uploading your file.";
      }
  }
?>

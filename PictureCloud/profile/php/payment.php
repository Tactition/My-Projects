<?php


session_start();
$username = $_SESSION['username'];
$user_fullname = $_SESSION["name"];

// recived with get method 
$amount = $_GET["amount"];
$plan = $_GET["plan"];
$storage = $_GET["storage"];


// Step 2: Validate the input
if (!$amount) {
    die('<h3>Error: All fields are required!</h3>');
}


sleep(2); // Simulate processing delay

// Step 4: Simulate Payment Success
$payment_id = uniqid('PAY_', true); // Generate a dummy payment ID
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Success</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <h2 class="text-center text-success">Payment Successful!</h2>
        <p class="text-center">Thank you, <strong><?php echo ucfirst($user_fullname); ?></strong>!</p>
        <p class="text-center">You have successfully purchased the <strong><?php echo ucfirst($plan); ?> Plan</strong> for ₹<?php echo $amount; ?>.</p>
        <p class="text-center">Payment ID: <strong><?php echo $payment_id; ?></strong></p>
        <a href="updateStorage.php?storage= <?php echo $storage ?>&plan=<?php echo $plan ?>" class="btn btn-primary btn-block">Finalize Payment and Upgrade Plan</a>
        
    </div>
</body>

</html>
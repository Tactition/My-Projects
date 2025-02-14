

<?php
// The recipient's email address
// $to = 'hadiyamehraj@gmail.com';

// The subject of the email
$subject = 'heloo zahid';

// The body of the email
$message = 'this is message body';

// The headers of the email
$headers = 'From: pictureCloud@gmail.com' . "\r\n" .
    'Reply-To: picturecloud@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Use the mail function to send the email
if (mail($to, $subject, $message, $headers)) {
    // If the email is sent successfully, echo this message
    echo '<h1>Email sent successfully!</h1>';
} else {
    // If the email fails to send, echo this message
    echo '<h1>Email sending failed.</h1>';
}

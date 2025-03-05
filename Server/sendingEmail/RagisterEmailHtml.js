exports.registerEmailHtml = (fullname, username, password) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Welcome to Prime Hub</title>
        </head>
        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7f9fc; margin: 0; padding: 0; color: #333333;">
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #007bff, #00c4cc); padding: 30px; text-align: center;">
                    <img src="https://res.cloudinary.com/da0lceyy7/image/upload/v1740898602/PrimeHubBlue_ugxjsp.jpg" alt="Prime Hub Logo" style="max-width: 150px; height: auto;">
                    <h1 style="color: #ffffff; font-size: 28px; margin: 10px 0 0;">Welcome, ${fullname}!</h1>
                </div>

                <!-- Body -->
                <div style="padding: 30px; line-height: 1.8;">
                    <p style="font-size: 16px;">Hello ${fullname},</p>
                    <p style="font-size: 16px;">We’re excited to welcome you to Prime Hub! Your account is ready, and you can now access tools to streamline your workday.</p>
                    <h2 style="font-size: 20px; color: #007bff; margin: 20px 0 10px;">Your Login Details</h2>
                    <div style="background-color: #f1f4f8; padding: 20px; border-radius: 8px; font-size: 15px;">
                        <p style="margin: 8px 0;"><strong>Username:</strong> ${username}</p>
                        <p style="margin: 8px 0;"><strong>Password:</strong> ${password}</p>
                    </div>

                    <h2 style="font-size: 20px; color: #007bff; margin: 20px 0 10px;">Get Started</h2>
                    <ul style="padding-left: 20px; font-size: 15px;">
                        <li>Log in at <a href="https://office-ms-two.vercel.app/" style="color: #007bff; text-decoration: none; font-weight: bold;">office-ms-two.vercel.app</a></li>
                        <li>Explore your dashboard</li>
                        <li>Need help? Email <a href="waghelakushal2003@gmail.com" style="color: #007bff; text-decoration: none; font-weight: bold;">waghelakushal2003@gmail.com</a> or visit our <a href="https://office-ms-two.vercel.app/contactus" style="color: #007bff; text-decoration: none; font-weight: bold;">Help Center</a></li>
                    </ul>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://office-ms-two.vercel.app/" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Log In Now</a>
                    </div>

                    <p style="font-size: 16px;">We’re here to help you succeed. Reply to this email with any questions!</p>
                    <p style="font-size: 16px;">Best regards,</p>
                    <p style="font-size: 15px; margin: 5px 0;">Kushal Vaghela<br>Software Developer, Prime Hub<br><a href="waghelakushal2003@gmail.com" style="color: #007bff; text-decoration: none;">waghelakushal2003@gmail.com</a></p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f1f4f8; padding: 20px; text-align: center; font-size: 13px; color: #666666;">
                    <p>Prime Hub | <a href="https://office-ms-two.vercel.app/" style="color: #007bff; text-decoration: none;">Visit Our Website</a></p>
                </div>
            </div>
        </body>
        </html>
    `;
};
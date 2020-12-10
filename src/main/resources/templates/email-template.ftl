<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
        body {
            font-size: 16px;
            font-weight: bold;
        }
    </style>
</head>
<body style="margin-top: 100px; padding: 0;">
    <table bgcolor="grey" align="center" border="0" cellpadding="0" cellspacing="0"  style="border-collapse: collapse; border: 2.5px solid orange; width: 600px;">
        <tr>
            <td align="center" style="padding: 25px 0 25px 0;">
                <img style="margin-bottom: 50px;" src="https://i.ibb.co/1ZWs10d/logo.png"  />
            </td>
        </tr>
        <tr>
            <td align="center" style="font-size: 35px; font-style: oblique;">
                <p style="margin-bottom: 50px;" >Du har blivit överbjuden!</p>
            </td>
        </tr>
        <tr>
            <td align="center" >
                <p style="font-size: 30px;font-style: oblique; font-weight: bold;">
                    ${auctionTitle}
                    <span style="margin-left: 10px; color:blue; font-style: normal;"> ${newBid} kr
                    </span>
                </p>
                <hr width="600px" style="margin-bottom: 50px; margin-top: 50px; border: 0; border-top: .5px solid orange;">
            </td>
        </tr>
            <td align="center" >
                <a href=${auctionLink} style="font-size: 20px;font-weight: bold; color: blue;">
                <p style="margin-top: 25px; margin-bottom: 40px;"> Till Auktionen </p>
                </a>
            </td>
    </table>
</body>
</html>
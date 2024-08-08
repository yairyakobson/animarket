export const updatePasswordMail = (username) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Password Updated</title>
  </head>
  
  <body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-cell">
                      <h1>Hi ${username},</h1>
                      <p>Your password has been successfully updated.</p>
                      <p>If you did not make this change, please <a href="{{support_url}}">contact support</a> immediately.</p>
                      <p>Thanks, <br/>The Animarket team</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
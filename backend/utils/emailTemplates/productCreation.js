export const productCreationMail = (username, product, productDetails, images) =>{
  const imageHtml = Array.isArray(images) && images.length ? 
  `<img src="${images[0].url}" alt="Product Image" style="width: 100%; max-width: 500px; margin-top: 10px;"/>` 
  : '<p>No images available.</p>';
  
  return(
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="x-apple-disable-message-reformatting"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="color-scheme" content="light dark"/>
        <meta name="supported-color-schemes" content="light dark"/>
          <title>New Product Created</title>
          <style type="text/css" rel="stylesheet" media="all">
          @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
            body{
              width: 100% !important;
              height: 100%;
              margin: 0;
              -webkit-text-size-adjust: none;
              background-color: #f2f4f6;
              color: #51545e;
            }
            a{
              color: #3869d4;
            }
            .preheader{
              display: none !important;
              visibility: hidden;
              mso-hide: all;
              font-size: 1px;
              line-height: 1px;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
            }
            body,
            td,
            th{
              font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
            }
            h1, h2, h3{
              margin-top: 0;
              color: #333333;
              font-weight: bold;
              text-align: left;
            }
            h1{
              font-size: 22px;
            }
            h2{
              font-size: 16px;
            }
            h3{
              font-size: 14px;
            }
            p, ul, ol, blockquote{
              margin: 0.4em 0 1.1875em;
              font-size: 16px;
              line-height: 1.625;
            }
            p.sub{
              font-size: 13px;
            }
            .button{
              background-color: #3869d4;
              border: 10px solid #3869d4;
              display: inline-block;
              color: #fff;
              text-decoration: none;
              border-radius: 3px;
              box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
              box-sizing: border-box;
            }
            .attributes_content{
              background-color: #f4f4f7;
              padding: 16px;
            }
            .email-wrapper{
              width: 100%;
              margin: 0;
              padding: 0;
              background-color: #f2f4f6;
            }
            .email-content{
              width: 100%;
              margin: 0;
              padding: 0;
            }
            .email-masthead{
              padding: 25px 0;
              text-align: center;
            }
            .email-masthead_name{
              font-size: 16px;
              font-weight: bold;
              color: #a8aaaf;
              text-decoration: none;
              text-shadow: 0 1px 0 white;
            }
            .email-body{
              width: 100%;
              margin: 0;
              padding: 0;
            }
            .email-body_inner{
              width: 570px;
              margin: 0 auto;
              padding: 0;
              background-color: #ffffff;
            }
            .email-footer{
              width: 570px;
              margin: 0 auto;
              padding: 0;
              text-align: center;
            }
            .email-footer p{
              color: #a8aaaf;
            }
            .body-action{
              width: 100%;
              margin: 30px auto;
              padding: 0;
              text-align: center;
            }
            .body-sub{
              margin-top: 25px;
              padding-top: 25px;
              border-top: 1px solid #eaeaec;
            }
            .content-cell{
              padding: 45px;
            }
            .purchase{
              width: 100%;
              margin: 0;
              padding: 35px 0;
              border-top: 1px solid #eaeaec;
            }
            .purchase_item{
              padding: 10px 0;
              color: #51545e;
              font-size: 15px;
              line-height: 18px;
            }
            .purchase_heading{
              padding-bottom: 8px;
              border-bottom: 1px solid #eaeaec;
            }
            .purchase_heading p{
              margin: 0;
              color: #85878e;
              font-size: 12px;
            }
            .purchase_footer{
              padding-top: 15px;
              border-top: 1px solid #eaeaec;
            }
            .purchase_total{
              margin: 0;
              text-align: right;
              font-weight: bold;
              color: #333333;
            }
            .purchase_total--label{
              padding: 0 15px 0 0;
            }
            .purchase_table{
              width: 100%;
              margin: 20px 0;
              border-collapse: collapse;
            }
            .purchase_table th, .purchase_table td{
              border: 1px solid #eaeaec;
              padding: 10px;
              text-align: left;
            }
            .purchase_table th{
              background-color: #f4f4f7;
              color: #51545e;
              font-weight: bold;
            }
            @media only screen and (max-width: 600px){
              .email-body_inner,
              .email-footer {
                width: 100% !important;
              }
            }
            @media (prefers-color-scheme: dark){
              body,
              .email-body,
              .email-body_inner,
              .email-content,
              .email-wrapper,
              .email-masthead,
              .email-footer {
                background-color: #333333 !important;
                color: #fff !important;
              }
              p,
              ul,
              ol,
              blockquote,
              h1,
              h2,
              h3,
              span,
              .purchase_item{
                color: #fff !important;
              }
              .attributes_content{
                background-color: #222 !important;
              }
              .email-masthead_name{
                text-shadow: none !important;
              }
            }
            :root{
              color-scheme: light dark;
              supported-color-schemes: light dark;
            }
          </style>
      </head>
      
      <body>
        <span class="preheader">A new product has been created in your account.</span>
          <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="email-masthead">
                      <a href="https://yourwebsite.com" class="f-fallback email-masthead_name">
                      Animarket
                      </a>
                    </td>
                  </tr>
                  
                  <tr>
                    <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                      <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-cell">
                            <div class="f-fallback">
                              <h1>Hi ${username},</h1>
                              <p>Your product <strong>${product}</strong> was added to the store.</p>
                                <table class="purchase_table">
                                  <thead>
                                  <tr>
                                    <th>Product Image</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>${imageHtml}</td>
                                      <td>${productDetails.description}</td>
                                      <td>$${productDetails.price}</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <p>If you have any questions, feel free to <a href="https://yourwebsite.com/contact">contact us</a>.</p>
                                <p>Thank you for shopping with us</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-cell" align="center">
                            <p class="sub align-center">&copy; Animarket. All rights reserved.</p>
                            <p class="sub align-center">Your Company<br>1234 Street Rd.<br>Suite 1234</p>
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
    </html>`
  )
}
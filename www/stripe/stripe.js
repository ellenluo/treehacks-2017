jQuery(document).ready(function (id) {
  var handler = StripeCheckout.configure({
    key: 'pk_test_1ikCSptUI6ji5bnIwVIL3CU6',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        $.post("https://5sqk10icy4.execute-api.us-west-2.amazonaws.com/dev/pledges/{id}", {
            pet_id: id,
            pledge_amount: amount
        })
    }
  });
  
  $("#enter_pledge").keyup(function(e){
    if(e.keyCode == 13){
        console.log("hi");
        e.preventDefault();
        console.log("woo");
        $('#error_explanation').html('');

        var amount = $('#enter_pledge').val();
        amount = amount.replace(/\$/g, '').replace(/\,/g, '')
        amount = parseFloat(amount);

        if (isNaN(amount)) {
            $('#error_explanation').html('<p>Please enter a valid amount in USD ($).</p>');
        }
        else if (amount < 1.00) {
            $('#error_explanation').html('<p>Sorry, pledge amount must be at least $1.</p>');
        }
        else {
            amount = amount * 100; // Needs to be an integer!
            handler.open({
                name: 'Petreon',
                description: 'Pledge to support this pet',
                zipCode: true,
                amount: Math.round(amount)
            })
        }
     }
  });
  
  window.addEventListener('popstate', function() {
    handler.close();
  });
});
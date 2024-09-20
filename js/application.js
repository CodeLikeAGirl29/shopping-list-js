// Helper function to calculate subtotal for each row
var calcSubTotal = function(element) {
  var itemPrice = parseFloat($(element).find(".price").text().substring(1));
  var itemQuantity = parseFloat($(element).find(".quantity input").val());
  if (isNaN(itemQuantity)) {
    itemQuantity = 0;
  }
  return itemPrice * itemQuantity;
};

// Update each subtotal
var updateSubTotal = function() {
  var prices = [];
  $("#product-list tr").each(function() {
    var subTotal = calcSubTotal(this);
    prices.push(subTotal);
    $(this).find(".subTotal").html("$" + subTotal.toFixed(2));
  });
  return prices;
};

// Calculate total
const updateCartTotal = () => {
  const subTotals = updateSubTotal();
  const total = subTotals.reduce((acc, val) => acc + val, 0).toFixed(2);
  $("#cartTotal").html(total);
};

// On document ready
$(document).ready(function() {
  updateCartTotal(); // Initial calculation
  var timeout;

  // Update subtotal and total on quantity change
  $(document).on("input", ".quantity input", function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      updateCartTotal();
    }, 500); // Debounce for 500ms
  });

  // Remove item from the cart
  $(document).on("click", ".btn.remove", function() {
    $(this).closest("tr").remove();
    updateCartTotal();
  });

  // Add new item to the cart
  $(".add-to").click(function() {
    var item = $("#addItem [name=itemName]").val();
    var price = parseFloat($("#addItem [name=price]").val()).toFixed(2);

    if (!item || isNaN(price)) {
      alert("Please enter valid item details");
      return;
    }

    $("#product-list").append(
      `<tr>
				<td>${item}</td>
				<td class="price text-center">$${price}</td>
				<td>
					<input class="form-control text-center" type="number" value="0" min="0" />
				</td>
				<td class="subTotal text-center">$0.00</td>
				<td class="text-center">
					<button class="btn btn-danger btn-sm remove">
						<i class="fa fa-trash"></i> Remove
					</button>
				</td>
			</tr>`
    );

    // Reset form fields
    $("#addItem [name=itemName]").val("");
    $("#addItem [name=price]").val("");

    updateCartTotal();
  });
});

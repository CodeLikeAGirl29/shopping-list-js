var calcSubTotal = function (element) {
	var itemPrice = $(element).find(".price").text().substring(1);
	var itemQuantity = parseFloat($(element).find(".quantity input").val());
	if (isNaN(itemQuantity)) {
		itemQuantity = 0;
	}
	var subTotal = itemPrice * itemQuantity;
	return subTotal;
};

var updateSubTotal = function (element) {
	var prices = [];
	$("tbody tr").each(function (index, element) {
		var subTotal = parseFloat(calcSubTotal(element));
		prices.push(subTotal);
		$(element)
			.children(".subTotal")
			.html("$" + subTotal.toFixed(2));
	});
	console.log(prices);
	return prices;
};

var sum = function (total, num) {
	return total + num;
};

var updateCartTotal = function () {
	var cartTotal = updateSubTotal().reduce(sum).toFixed(2);
	$("#cartTotal").html(cartTotal);
};

$(document).ready(function () {
	updateCartTotal();

	var timeout;
	$(document).on("input", "tr input", function () {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			updateCartTotal();
		}, 800);
	});

	$(document).on("click", ".btn.remove", function (event) {
		$(this).closest("tr").remove();
		updateCartTotal();
	});

	$("#addItem").on("submit", function (event) {
		event.preventDefault();
		var item = $(this).children("[name=itemName]").val();
		var price = parseFloat($(this).children("[name=price]").val()).toFixed(2);

		$("tbody").append(
			`<tr>
        <td class="item">
        ${item}
        </td>
        <td class="price">$
        ${price}
        </td>
        <td class="quantity"><input type="number" value="0" min="0"></td>
        <td class="subTotal text-center"></td>
        <td><button class="btn btn-sm btn-danger remove">Remove</button></td>
        </tr>`
		);

		updateCartTotal();
		$(this).children("[name=itemName]").val("");
		$(this).children("[name=price]").val("");
	});
});

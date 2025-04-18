
// Load Razorpay script dynamically

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const paysalary = async (salary) => {
    try {
        const res = await loadRazorpayScript();
        if (!res) {
            alert("Failed to load Razorpay SDK. Check your internet connection.");
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/create-order`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({amount: salary.amount, id: salary._id}),
        });
        const order = await response.json();

        const options = {
            key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID,
            amount: salary.amount * 100,
            currency: "INR",
            order_id: order.id,
            name: "Prime Hub",
            description: `Salary Payment for ${salary.name}`,
            handler: function (response) {
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {name: salary.name, email: salary.email, contact: salary.contact},
            theme: {color: "blue"}
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Error processing payment:", error);
    }
}
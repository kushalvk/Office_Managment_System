export const error = (err) => {
    if (err.response) {
        throw new Error(err.response.data.error || "Oprating failed");
    } else if (err.request) {
        throw new Error("No response from the server. Please try again later.");
    } else {
        throw new Error("Error: " + err.message);
    }
}
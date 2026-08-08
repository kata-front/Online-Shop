import { createSafeActionClient } from "next-safe-action";

const actionClient = createSafeActionClient({
    defaultValidationErrorsShape: "flattened",
    handleServerError: (error) => {
        console.error(error);

        return error.message || "Something went wrong";
    }
})

export default actionClient
import z, { email } from "zod";

const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
    userAgent: z.string().optional()
}).refine(
    (data) => {
        data.password === data.confirmPassword;
    },{
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export default registerSchema;
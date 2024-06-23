import { post } from "@/lib/fetch";
import IUser from "@/types/user";

export async function editUser(prevState: any, formData: FormData) {
    const { data, status } = await post<IUser>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me/edit/`, {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName")
    })
    if (status === 200) return { message: "", user: data }
    return { message: "Edit failed.", user: null }
}

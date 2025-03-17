import { get, post } from "@/utils/requests";
export const getAccounts = async () =>{
    const result = get("accounts");
    return result;
}
export const postAccounts = async (data:any) =>{
    const result = post("accounts", data)
    return result;
}
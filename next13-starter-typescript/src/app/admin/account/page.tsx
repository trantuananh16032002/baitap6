"use client";
import { getAccounts, postAccounts } from "@/services/accountServices";
import { PUBLIC_DOMAIN } from "@/utils/requests";
import { useEffect, useState } from "react";

function Account() {
    const [showForm, setShowForm] = useState(false);
    const [reload, setReload] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        image: null
    });
    const [account, SetAccount] = useState<any>();

    useEffect(() => {
            const fetchAccount = async () => {
                // try {
                //     const response = await fetch("http://localhost:5000/api/accounts");
                //     if (!response.ok) {
                //         throw new Error("Unauthorized");
                //     }
                //     const data= await response.json();
                //     SetAccount(data.data);
                // } catch (error) {
                //     console.error("Lỗi khi gọi API:", error);
                // }
                const data = await getAccounts();
                SetAccount(data.data);
            };
            fetchAccount();
    }, [reload]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "file" && e.target instanceof HTMLInputElement) {
            const files = e.target.files;
            setFormData((prev) => ({
                ...prev,
                [name]: files ? files[0] : null
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const handleSetForm = () =>{
        setShowForm(!showForm);
    }
    // console.log(formData);
    console.log(account);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", formData.username);
        data.append("password", formData.password);
        data.append("role", formData.role);
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            // const response = await fetch("http://localhost:5000/api/accounts", {
            //     method: "POST",
            //     body: data
            // });
            // const result = await response.json();
            const post = await postAccounts(data);
            setReload(!reload);
            handleSetForm();
            console.log("Kết quả:", post);
        } catch (error) {
            console.error("Lỗi gửi dữ liệu:", error);
        }
    };

    return (
        <>
            <div className="content__action">
                <button className="content__action--button" onClick={() => setShowForm(true)}>Thêm</button>
            </div>
            <table className="table-main">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>Chức vụ</th>
                        <th>Ảnh</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {account && account.length > 0 ? (
                        account.map((acc: { _id: string; username: string; role: string; avatar?: string }, index: number) => (
                            <tr key={acc._id}>
                                <td>{index + 1}</td>
                                <td>{acc.username}</td>
                                <td>{acc.role === "admin" ? "Quản trị viên" : "Quản lý nội dung"}</td>
                                <td>
                                    <img src={acc?.avatar ? `${PUBLIC_DOMAIN}${acc.avatar}` : "/img/user.svg"} 
                                        alt="Avatar" width="40" height="40" style={{ borderRadius: "50%" }} />
                                </td>
                                <td>
                                    <button>Sửa</button> /
                                    <button>Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showForm && (
                <form className="form--create" onSubmit={handleSubmit}>
                    <div className="form--create__input">
                        <label className="form--create__input--label">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form--create__input--input"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form--create__input">
                        <label className="form--create__input--label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form--create__input--input"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form--create__input">
                        <label className="form--create__input--label">Chức vụ</label>
                        <select
                            name="role"
                            className="form--create__input--input"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">-- Chọn chức vụ --</option>
                            <option value="admin">Quản trị viên</option>
                            <option value="content_manager">Quản lý nội dung</option>
                        </select>
                    </div>
                    <div className="form--create__input">
                        <label className="form--create__input--label">Ảnh</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form--create__input">
                        <button className="form--create__input--button" type="submit">Lưu</button>
                        <button className="form--create__input--button" type="button" onClick={() => setShowForm(false)}>Đóng</button>
                    </div>
                </form>
            )}
        </>
    );
}

export default Account;

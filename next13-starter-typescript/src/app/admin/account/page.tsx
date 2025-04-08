"use client";
import { getAccounts, postAccounts } from "@/services/accountServices";
import { PUBLIC_DOMAIN } from "@/utils/requests";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function Account() {
    const [showForm, setShowForm] = useState(false);
    const [reload, setReload] = useState(false);
    const [formData, setFormData] = useState<any>({
        username: "",
        password: "",
        role: "",
        images: [null, null, null, null],
    });
    const [account, SetAccount] = useState<any>();
    const handleSetForm = () =>{
        setShowForm(!showForm);
    }
    useEffect(() => {
            const fetchAccount = async () => {
                const data = await getAccounts();
                SetAccount(data.data);
            };
            fetchAccount();
    }, [reload]);
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prev:any) => ({ ...prev, [name]: value }));
    };
    const handleImageChange = (index:any, event:any) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...formData.images];
            newImages[index] = file 
            setFormData((prev:any) => ({ ...prev, images: newImages }));
        }
        // Tạo URL để hiển thị ảnh preview
        const previewUrl = URL.createObjectURL(file);
        setFormData((prev:any) => ({ ...prev, [`previewImage${index + 1}`]: previewUrl }));
    };
    // console.log(formData);
    // console.log(account);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", formData.username);
        data.append("password", formData.password);
        data.append("role", formData.role);
        data.append("content", createEditorContent);
        formData.images.forEach((file:any, index:any) => {
            if (file) {
                data.append(`image`, file);
            }
        });
        data.forEach((value, key) => {
            console.log(`${key}:`, value);
        });
        try {
            const post = await postAccounts(data);
            setReload(!reload);
            handleSetForm();
            console.log("Kết quả:", post);
        } catch (error) {
            console.error("Lỗi gửi dữ liệu:", error);
        }
    };
    const [createEditorContent, setCreateEditorContent] = useState('');
    const createEditorRef = useRef(null);
    const editorConfig = {
        height: 200,
        menubar: true,
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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
                    {/* <div className="form--create__input">
                        <label className="form--create__input--label">Ảnh</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                        />
                    </div> */}
                    <Editor
                            apiKey='q241rxxlcpfwsdqjqbx2obdhb1mlc048mju8h4mhq356upoo'
                            onInit={(evt:any, editor:any) => createEditorRef.current = editor}
                            value={createEditorContent}
                            onEditorChange={(content:any) => setCreateEditorContent(content)}
                            init={editorConfig}
                        />
                    <div className="image-grid">
                        {formData.images.map((img:any, index:any) => (
                            <div key={index} className="image-box">
                                {img ? (
                                    <Image src={formData[`previewImage${index + 1}`]} alt={`Ảnh ${index + 1}`} className="preview-image" width={50} height={50}/>
                                ) : (
                                    <label className="image-placeholder">
                                        <span>+</span>
                                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} />
                                    </label>
                                )}
                            </div>
                        ))}
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

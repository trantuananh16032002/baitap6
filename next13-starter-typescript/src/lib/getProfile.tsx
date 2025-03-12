export async function getProfile() {
    try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
            cache: "no-store",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Lỗi API: ${errorData.message || res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Lỗi khi lấy profile:", error);
        throw new Error("Không thể lấy dữ liệu");
    }
}

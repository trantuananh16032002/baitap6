"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { APT_DOMAIN, PUBLIC_DOMAIN } from "@/utils/requests";

type ProfileType = {
    username: string;
    name: string;
    avatar: string;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${APT_DOMAIN}auth/profile`, { credentials: "include" });
                if (!response.ok) {
                    throw new Error("Unauthorized");
                }
                const data: ProfileType = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                router.push("/login");
            }
        };
        fetchProfile();
    }, [router]);

    if (!profile) {
        return <p>Đang kiểm tra đăng nhập...</p>;
    }

    return (
        <div className="main">
            <div className="sidebar">
                <div className="sidebar__logo">TUANANH</div>
                <ul className="sidebar__list">
                    <li className={`sidebar__item ${pathname === "/admin" ? "active" : ""}`}>
                        <Link className="sidebar__item--link" href="/admin">Home</Link>
                    </li>
                    <li className={`sidebar__item ${pathname === "/admin/account" ? "active" : ""}`}>
                        <Link className="sidebar__item--link" href="/admin/account">Danh sách tài khoản</Link>
                    </li>
                    <li className={`sidebar__item ${pathname.startsWith("/admin/products") ? "active" : ""}`}>
                        <Link className="sidebar__item--link" href="/admin/products">Danh sách sản phẩm</Link>
                    </li>
                    <li className={`sidebar__item ${pathname.startsWith("/admin/category") ? "active" : ""}`}>
                        <Link className="sidebar__item--link" href="/admin/category">Danh mục sản phẩm</Link>
                    </li>
                    <li className={`sidebar__item ${pathname.startsWith("/admin/variants") ? "active" : ""}`}>
                        <Link className="sidebar__item--link" href="/admin/variants">Variant</Link>
                    </li>
                </ul>
            </div>
            <div className="maincontent">
                <div className="maincontent__header">
                    <div className="header__search">
                        <img className="header__search--icon" src="/img/search.svg" alt="Tìm kiếm" />
                        <input type="text" className="header__search--input" placeholder="Search for products"/>
                    </div>
                    <img 
                        className="maincontent__header--users"
                        src={profile?.avatar ? `${PUBLIC_DOMAIN}${profile.avatar}` : "/img/user.svg"}
                        alt="Avatar"
                    />
                </div>
                <div className="maincontent__content">
                    {children}
                </div>
            </div>
        </div>
    );
}

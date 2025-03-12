"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
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
            </ul>
        </div>
    );
}

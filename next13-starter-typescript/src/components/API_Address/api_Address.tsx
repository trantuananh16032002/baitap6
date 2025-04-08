import { useState, useEffect } from "react";

const API_KEY = "pk.0762c022356579f00b64df2a851b9ced"; // Thay API Key của bạn vào đây

export default function AddressAutocomplete() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isSelecting, setIsSelecting] = useState(false); // Đánh dấu khi chọn địa chỉ

    useEffect(() => {
        if (isSelecting) {
            setIsSelecting(false); // Reset trạng thái khi đã chọn
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            if (query.length > 2) {
                try {
                    const res = await fetch(
                        `https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${query}&format=json`
                    );
                    const data = await res.json();
                    setSuggestions(data);
                } catch (error) {
                    console.error("Lỗi lấy địa chỉ:", error);
                }
            } else {
                setSuggestions([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Hàm chọn địa chỉ
    const handleSelectAddress = (address: string) => {
        setQuery(address);
        setSuggestions([]);
        setIsSelecting(true); // Đánh dấu là đang chọn
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập địa chỉ..."
                className="border p-2 w-full"
            />
            {suggestions.length > 0 && (
                <ul className="border mt-2 bg-white shadow-md absolute w-full z-10">
                    {suggestions.map((place, index) => (
                        <li 
                            key={index} 
                            className="p-2 cursor-pointer hover:bg-gray-200" 
                            onClick={() => handleSelectAddress(place.display_name)}
                        >
                            {place.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

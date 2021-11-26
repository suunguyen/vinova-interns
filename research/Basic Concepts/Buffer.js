/*
    - Là bộ nhớ tạm thời được lưu ở RAM
    - Dùng để đọc ghi dữ liệu nhị phân
    Eg: Khi tải video lớn thay vì thay tải hết thì ta có thể chia nhỏ ra để dễ truyền tải trong môi trường mạng
    * Buffer operator
    - Creating
    - Writting
    - Reading
    - Convert Buffer to JSON
    - Concatenate Buffers: Nối
    - Compare
    - Copy
    - Slice
    - Buffer Length
*/

// Khởi tạo
var buffer = Buffer.alloc(1024);
// Viết
buffer.write("Hello world");

// Convert to JSON
console.log(buffer.toJSON());
console.log(buffer.toString());
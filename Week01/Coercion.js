// Coercion có 2 kiểu:
// 1. explicit
var a = "42";
var b = Number(a);
a;

/*
    Explicit thể hiện qua các hàm:
        - ParseInt()
        - Number()
        - Stringify()
*/

// 2. implicit
var c = "42";
var d = c * 1;
c;
d;
console.log("42" * 1);
/*
    Explicit thường gặp trong:
        - Biểu thức điều kiện
        - So sánh tương đối
*/

// Null, undefine, "", 0, false, NaN => falsy

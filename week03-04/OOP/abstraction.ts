/*
    - Tính trừ tượng dùng để chỉ quá trình ẩn đi việc triển khai thực thế của một ứng dụng
    - Thay vào đó tập trung vào cách sử dụng chúng
*/

abstract class Person {
    abstract name: string;

    display(): void{
        console.log(this.name);
    }
}

class Employee extends Person { 
    name: string;
    empCode: number;
    
    constructor(name: string, code: number) { 
        super(); // must call super()  
        this.empCode = code;
        this.name = name;
    }
}

let emp: Person = new Employee("James", 100);
emp.display();

/*
    - Lưu list dưới dạng Map[key, value] => duyệt trên Map => 0(1)
*/

// Sample Code
const arrayList = [{
        name: 'Nguyen Van A',
        class: 'Class A'
    },
    {
        name: 'Nguyen Van B',
        class: 'Class B'
    },
    {
        name: 'Nguyen Van C',
        class: 'Class C'
    },
    {
        name: 'Nguyen Van D',
        class: 'Class D'
    },
    {
        name: 'Nguyen Van E',
        class: 'Class E'
    }
];

function transformListIntoMaps(name) {
    const keyValuePairs = arrayList.map(item => [item[name], item]);
    return new Map(keyValuePairs);
}

const map = transformListIntoMaps('name');

const item = map.get('Nguyen Van A');
console.log(item.class);
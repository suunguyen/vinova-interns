/*
    Ý tưởng: Lưu list dưới dạng Map[key, value] => duyệt trên Map => 0(1)
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

const transformListIntoMaps = (key) => {
    const keyValuePairs = arrayList.map(item => [item[key], item]);
    return new Map(keyValuePairs);
}

const searchEngine = (name) => {
    const map = transformListIntoMaps('name');
    return map.get(name).class;
}
console.log(searchEngine('Nguyen Van A'));
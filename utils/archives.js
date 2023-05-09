import dayjs from 'dayjs';

export default function getArchives(posts) {
    const arr = [];
    posts.forEach(post => {
        const year = dayjs(post.date).format('YYYY');
        const index = arr.findIndex(item => item.year === year);
        const temp = {
            title: post.title,
            date: dayjs(post.date).format('MM-DD'),
            abbrlink: post.abbrlink,
        };
        if (index !== -1) {
            arr[index]['posts'].push(temp);
        } else {
            arr.push({
                year: year,
                posts: [temp],
            });
        }
    });
    function sortByKey(keys) {
        return function (a, b) {
            if (a[keys] < b[keys]) {
                return 1;
            } else {
                return -1;
            }
        };
    }
    arr.sort(sortByKey('year'));
    arr.map(item => {
        return { year: item.year, posts: item.posts.sort(sortByKey('date')) };
    });
    return arr;
}
